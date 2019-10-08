"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import graphqlHTTP from "express-graphql";
//import { buildSchema } from "graphql";
var sequelize = new _sequelize["default"]("postgres://dev:dev@postgres:5432/library");
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema["default"],
  resolvers: _resolvers["default"],
  context: {
    models: _models["default"]
  }
});
var app = (0, _express["default"])();
server.applyMiddleware({
  app: app
});

_models["default"].sequelize.authenticate();

_models["default"].sequelize.sync();

app.listen(process.env.PORT, function () {
  console.log("\uD83E\uDD84 Listening on PORT: ".concat(process.env.PORT));
});