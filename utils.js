const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = async data => {
	const hashedData = await bcrypt.hash(data, saltRounds);
	return hashedData;
};

const verify = async ({ data, hashedData }) => {
	const result = await bcrypt.compare(data, hashedData);
	return result;
};

const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = {
	hash,
	verify,
	generateOTP,
};