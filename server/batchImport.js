const fs = require("file-system");
const { json } = require("body-parser");
const assert = require("assert");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const items = JSON.parse(fs.readFileSync("./data/companies.json"));

const batchImport = async () => {
  const dbName = "ecommerce_group";
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connecting...");

    const db = client.db(dbName);
    console.log("connected to database");

    const result = await db.collection("companies").insertMany(items);
    console.log(result);
    console.log("inserting items into database...");

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
