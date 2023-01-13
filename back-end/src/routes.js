const express = require("express");
const PersonController = require("./controllers/PersonController");

const routes = express.Router();

routes.get("/persons/:search*?", PersonController.index);

routes.post("/persons", PersonController.store);

routes.patch("/persons/:id", PersonController.update);

routes.delete("/persons/:id", PersonController.delete);

module.exports = routes;
