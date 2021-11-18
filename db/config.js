const config = require('config');
const dbConfig = { ...config.db, dialect: 'postgres' };

module.exports = {
    development: dbConfig,
    production: dbConfig,
};