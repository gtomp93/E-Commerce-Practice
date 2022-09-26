// using dependency to generate unique purchase Ids
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const assert = require("assert");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "ecommerce_group";
// const client = new MongoClient(MONGO_URI, options);

const items = require("./data/items.json");
const companies = require("./data/companies.json");

// handlers for the different endpoints
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db.collection("items").find().toArray();

    if (result) {
      res.status(200).json({ status: 200, result });
    } else if (!result) {
      res.status(500).json({ status: 500, error: "data not found" });
    }
    client.close();
    console.log("disconnecting...");
  } catch (err) {
    console.log(err.stack);
  }
};

const getItemsByCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const categoryParam = req.params.category;

  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db
      .collection("items")
      // $regex and $options allows params to be case insensitive and will
      // return objects even under partial matches: e.g. /category/pets
      // will still return objects with the value "Pets and Animals"
      .find({ category: { $regex: categoryParam, $options: "i" } })
      .toArray();

    result.length > 0
      ? res.status(200).json({ status: 200, categoryParam, result })
      : res.status(500).json({ status: 500, error: "not found" });

    client.close();
    console.log("disconnecting...");
  } catch (err) {
    console.log(err.stack);
  }
};

const getCompanies = (req, res) => {
  const companyList = companies;
  res.status(200).json({ status: 200, companyList });
};

const getCompanyById = (req, res) => {
  const id = req.params.id;
  let company = companies.filter((comp) => {
    return id == comp._id;
  });
  if (company.length <= 0) {
    res.status(500).json({ status: 500, error: "company id not found" });
  }
  res.status(200).json({ status: 200, company });
};

const getItemById = async (req, res) => {
  const idParam = parseInt(req.params.id);
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db.collection("items").findOne({ _id: idParam });

    result
      ? res.status(200).json({ status: 200, idParam, result })
      : res.status(500).json({ status: 500, error: "id not found" });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

const addPurchase = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("connecting to db...");

    const db = client.db(dbName);

    const result = await db.collection("purchases").insertOne(req.body);

    result
      ? res.status(200).json({ status: 200, result })
      : res.status(500).json({ status: 500, error: "there was an issue" });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

const updateItem = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    console.log("updating db...");

    const db = client.db(dbName);

    console.log(req.body);

    result = await db
      .collection("items")
      .updateOne(
        { _id: req.body._id },
        { $inc: { numInStock: -req.body.quantity } }
      );

    result
      ? res.status(200).json({ status: 200, result })
      : res.status(500).json({ status: 500, error: "there was an issue" });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
  getItems,
  getItemById,
  getItemsByCategory,
  getCompanies,
  getCompanyById,
  addPurchase,
  updateItem,
};
