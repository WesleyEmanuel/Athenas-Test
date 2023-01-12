const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
require("../database");

const Person = require("../models/Person");

const connection = new Sequelize(dbConfig);

Person.init(connection);

module.exports = connection;
