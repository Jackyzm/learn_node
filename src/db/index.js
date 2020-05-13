const { MongoClient } = require('mongodb');
const config = require('config').get('mongo');
const assert = require('assert');

// Connection URL / Database Name
const { url, dbName } = config;


let DB;
let Client;

// Use connect method to connect to the server
const initMongo = async () => {
	MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
		assert.equal(null, err);
		console.log(`Connected successfully to ${url}`);

		Client = client;
		DB = client.db(dbName);

		// client.close(() => {
		// 	console.log('-----');
		// });
	});
};

module.exports = {
	DB,
	Client,
	initMongo
};
