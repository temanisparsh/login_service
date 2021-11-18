const express = require('express');
const moment = require('moment');
const config = require('config');
const AWS = require('aws-sdk');

const { User } = require('./models');
const { addAtomicTransaction } = require('./middleware');
const { hash, verify, generateOTP } = require('./utils');

const router = express.Router();

router.use(addAtomicTransaction);

router.post('/send', async (req, res, next) => {
    const { transaction, body } = req;
    const { phoneNumber } = body;

    let user = await User.findOne({
        where: { phone_number: phoneNumber },
        transaction,
        lock: true,
        skipLocked: true,
    });

    if (user) {
        const createdAt = moment(user.createdAt);
        const diff = moment().diff(createdAt, 'seconds');
        if (diff < config.app.cooldown) {
            res.status(400).send({ message: `OTP already sent in the last ${config.app.cooldown} seconds` });
            await next();
            return;
        }
        await User.destroy({
            where: { phone_number: phoneNumber },
            transaction,
            lock: true,
            skipLocked: true,
        });
    }

    const otp = generateOTP();
    const hashed_otp = await hash(otp);

    user = await User.create({
        phone_number: phoneNumber,
        otp: hashed_otp,
    }, { transaction });

    const params = {
        Message: `Your Login OTP is ${otp}`,
        PhoneNumber: `+${phoneNumber}`,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': config.app.senderId,
            }
        }
    };

    try {
        const result = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    } catch (error) {
        console.log(error);
    }

    res.status(200).send({ message: 'OTP has been sent' });
    await next();
});

router.post('/verify', async (req, res, next) => {
    const { transaction, body } = req;
    const { phoneNumber, otp } = body;

    let user = await User.findOne({
        where: { phone_number: phoneNumber },
        transaction,
        lock: true,
        skipLocked: true,
    });

    if (!user) {
        res.status(400).send({ message: 'Invalid phone number!' });
        await next();
        return;
    }

    const createdAt = moment(user.createdAt);
    const diff = moment().diff(createdAt, 'seconds');
    if (diff > config.app.validity) {
        res.status(400).send({ message: 'Invalid OTP!' });
        await next();
        return;
    }

    const isValid = await verify({data: otp, hashedData: user.otp});
    if (isValid) {
        await User.destroy({
            where: { phone_number: phoneNumber },
            transaction,
            lock: true,
            skipLocked: true,
        });
        res.status(200).send({ message: 'OTP Verified!' });
    } else {
        res.status(400).send({ message: 'Invalid OTP!' });
    }

    await next();
});

module.exports = router;