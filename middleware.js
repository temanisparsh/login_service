const { sequelize } = require('./models');

const addAtomicTransaction = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    req.transaction = transaction;

    res.on('finish', async () => {
        await transaction.commit();
    });
    
    await next();
}

module.exports = {
    addAtomicTransaction,
};