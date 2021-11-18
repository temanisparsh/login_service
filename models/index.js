const Sequelize = require('sequelize');
const config = require('config');
const _ = require('lodash');

const User = require('./User');

const { db: dbConfig } = config;

const db = {};
const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{ ...dbConfig, dialect: 'postgres', logging: false }
);

const models = [User];

_.forEach(models, model => {
	const sequelizedModel = model(sequelize, Sequelize.DataTypes);
	db[sequelizedModel.name] = sequelizedModel;
});

_.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;