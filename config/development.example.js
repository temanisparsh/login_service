module.exports = {
	app: {
		port: 8000,
		cooldown: 30,
		validity: 300,
		senderId: 'LOGINOTP',
	},
	db: {
		host: 'localhost',
		username: 'postgres',
		password: 'password',
		database: 'login_service',
	},
};