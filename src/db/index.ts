import assert from 'assert';
import config from 'config';
import { MongoClient, Db } from 'mongodb';

interface IConfigMongo {
    url: string,
    dbName: string
}
const myConfig: IConfigMongo = config.get('mongo');

// Connection URL / Database Name
const { url, dbName } = myConfig;

/**
 * Mongo Class
 * @description Mongo
 */
class Mongo {
    public initMongo(): void {
        // Use connect method to connect to the server
        MongoClient.connect(url, { useUnifiedTopology: true }, (err: Error, client: MongoClient): void => {
            assert.equal(undefined, err);
            console.log(`Connected successfully to ${url}`);

            this.Client = client;
            this.DB = client.db(dbName);

            // client.close(() => {
            //     console.log('-----');
            // });
        });
    }
}

const mongoDB: { initMongo: void, Client: MongoClient, DB: Db } = new Mongo();

export { mongoDB };
