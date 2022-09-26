"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 4000;

const {
  getItems,
  getItemById,
  getItemsByCategory,
  getCompanies,
  getCompanyById,
  addPurchase,
  updateItem,
} = require("./handlers");

const {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getProfile,
  postPassword,
  getLogout,
  getToken,
} = require("./MVC/controllers/User");

express()
  .use(cors())
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //requests for static files are routed to the public folder
  .use(express.static("public"))

  .get("/api/items", getItems)
  .get("/api/items/:id", getItemById)
  .get("/api/items/category/:category", getItemsByCategory)
  .get("/api/companies", getCompanies)
  .get("/api/companies/:id", getCompanyById)
  .patch("/api/items/update", updateItem)
  .post("/api/purchase", addPurchase)

  // Login stuff
  .get("/api/login", getLogin)
  .post("/api/login", postLogin)

  .get("/logout", getLogout)

  .post("/api/token", getToken)

  .post("/api/register", postRegister)
  .get("/api/register", getRegister)

  .get("/api/profile", getProfile)
  .post("/api/profile", postPassword)
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // REST endpoints?
  // .get('/bacon', (req, res) => res.status(200).json('🥓'))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
