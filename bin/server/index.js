"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import graphqlHTTP from "express-graphql";
//import { buildSchema } from "graphql";
var sequelize = new _sequelize["default"]("postgres://dev:dev@postgres:5432/library");
var app = (0, _express["default"])();
var typeDefs = (0, _apolloServerExpress.gql)("\n    type Query {\n        hello: String\n    }\n");
var resolvers = {
  Query: {
    hello: function hello() {
      return 'Hello world new !';
    }
  }
};
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.applyMiddleware({
  app: app
});
/* app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})); */

sequelize.authenticate().then(function () {
  console.log('Connection established !!');

  _users["default"].findAll(function (user) {
    return console.log(user);
  });
})["catch"](function (err) {
  console.error("Unable to log :");
  console.error(err);
});
app.listen(process.env.PORT, function () {
  console.log("\uD83E\uDD84 Listening on PORT: ".concat(process.env.PORT));
});
/*
graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
    console.log(process.env.MY_SECRET);
}); */