const Sequelize = require("sequelize");
const config = require("../config/database");

const Login = require("../app/models/Login");
const Empresa = require("../app/models/Empresa");

const connection = new Sequelize(config);

Login.init(connection);
Empresa.init(connection);

module.exports = connection;
