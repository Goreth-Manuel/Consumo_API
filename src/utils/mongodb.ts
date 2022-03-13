import { Db, MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error("");
}

if (!dbName) {
  throw new Error("");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // conectando
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  // setando as variaveis
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
