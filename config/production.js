const {
    APP_PORT,
    APP_COOLDOWN,
    APP_VALIDITY,
    APP_SENDER_ID,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = process.env;

module.exports = {
    app: {
        port: APP_PORT,
        cooldown: Number(APP_COOLDOWN),
        validity: Number(APP_VALIDITY),
        senderId: APP_SENDER_ID
    },
    db: {
        host:   DB_HOST,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
    },
};
