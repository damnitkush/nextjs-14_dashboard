import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO;

if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO environment variable inside .env.local'
    );
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDB() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db();

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}
