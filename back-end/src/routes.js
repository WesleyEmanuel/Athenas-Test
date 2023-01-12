const express = require("express");
const PersonController = require("./controllers/PersonController");

const routes = express.Router();

routes.get("/persons", PersonController.index);

routes.post("/persons", PersonController.store);

module.exports = routes;
