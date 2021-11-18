const express = require('express');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./models');
const router = require('./router');

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/api', router);

app.get('/', async (req, res) => {
    res.status(200).send('OK');
});

db.sequelize.sync().then(() => {
	console.log(
		`Databse ${config.db.database} connected at ${config.db.host}`
	);
});

app.listen(config.app.port, () => {
    console.log(`App started at PORT: ${config.app.port}`);
});