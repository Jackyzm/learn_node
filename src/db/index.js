const { MongoClient } = require('mongodb');
const config = require('config').get('mongo');
const assert = require('assert');

// Connection URL / Database Name
const { url, dbName } = config;

class Mongo {
	initMongo() {
		// Use connect method to connect to the server
		MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
			assert.equal(null, err);
			console.log(`Connected successfully to ${url}`);

			this.Client = client;
			this.DB = client.db(dbName);

			// client.close(() => {
			// 	console.log('-----');
			// });
		});
	}
}

module.exports = new Mongo();
