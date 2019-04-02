const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
	client: 'sqlite',
	useNullAsDefault: true,
	connection: {
		filename: './data/lambda.sqlite3'
	}
});










module.exports = router;