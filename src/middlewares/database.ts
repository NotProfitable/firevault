import {MongoClient} from 'mongodb';
import {dbname, mongoUsers} from '../../credentials';

const uri = mongoUsers;

let client: MongoClient;
let conn;

if (!uri) {
  throw new Error(
    `Please define the MONGODB_URI environment variable inside .env.local`,
  );
}

export async function connectToDatabase() {
  try {
    conn = client.isConnected;
  } catch (err) {
    conn = false;
  }
  if (!conn) {
    client = await MongoClient.connect(uri as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const db = await client.db(dbname);

  return { client, db };
}

export async function connectToFileDatabase() {
  try {
    conn = client.isConnected;
  } catch (err) {
    conn = false;
  }
  if (!conn) {
    client = await MongoClient.connect(uri as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const dbFile = await client.db(`UserFiles`);

  return { client, dbFile };
}
