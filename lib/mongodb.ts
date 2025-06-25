import { MongoClient, Db } from "mongodb";

const uri = process.env.DATABASE_URL!;
if (!uri) throw new Error("MONGODB_URI is not defined");

const globalForMongo = globalThis as unknown as {
  _mongoClient: MongoClient | undefined;
  _mongoDb: Db | undefined;
};

let client: MongoClient;
let db: Db;

try {
  if (!globalForMongo._mongoClient || !globalForMongo._mongoDb) {
    client = new MongoClient(uri);

    // Try connecting to MongoDB
    await client.connect();

    // Extract DB name from URI if present
    const dbName =
      client.options?.dbName || new URL(uri).pathname?.substring(1);
    if (!dbName) throw new Error("Database name is missing in the URI");

    // Use the default DB from URI
    db = client.db();

    // Optional: check if DB exists in the list
    const admin = client.db().admin();
    const { databases } = await admin.listDatabases();
    const dbExists = databases.some(
      (database) => database.name === db.databaseName
    );
    if (!dbExists)
      throw new Error(`Database "${db.databaseName}" does not exist`);

    globalForMongo._mongoClient = client;
    globalForMongo._mongoDb = db;

    console.log("✅ MongoDB connected to:", db.databaseName);
  } else {
    client = globalForMongo._mongoClient;
    db = globalForMongo._mongoDb;
    console.log("♻️ Reusing existing MongoDB connection:", db.databaseName);
  }
} catch (error) {
  console.error("❌ MongoDB connection error:", error);
  throw error;
}

export { client, db };
