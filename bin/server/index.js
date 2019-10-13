"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import graphqlHTTP from "express-graphql";
//import { buildSchema } from "graphql";
//const sequelize = new Sequelize(`postgres://dev:dev@postgres:5432/library`);
const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: {
    models: _models.default
  }
});
const app = (0, _express.default)();
app.get('/', (req, res) => {
  console.log(req.headers);
  res.send("hello");
});
app.get('/login', (req, res) => {
  console.log(req.headers);
  res.send(`
    <form method="POST"action="#">
        <input type="text" name="test" placeholder="Login">
        <input type="password" name="pass" placeholder="Password">
        <input type="submit" value="login">
    </form>`);
});
app.post('/login', (req, res) => {
  res.send(`<p>It Works</p>`);
});
server.applyMiddleware({
  app,
  path: "/explore"
});

_models.default.sequelize.authenticate();

_models.default.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`🦄 Listening on PORT: ${process.env.PORT}`);
});