"use strict";

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _models = _interopRequireDefault(require("../models"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: ({
    req
  }) => {
    // get the user token from the headers
    //const token = req.headers.authorization || '';
    // try to retrieve a user with the token
    // const user = getUser(token);
    // add the user to the context
    return {
      req,
      models: _models.default
    };
  },
  introspection: true,
  playground: true
});
const app = (0, _express.default)();
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/front.html");
});
app.get('/login', (req, res) => {
  let usertoken = _jsonwebtoken.default.sign({
    role: 'user'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });

  let admintoken = _jsonwebtoken.default.sign({
    role: 'admin'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });

  res.send(`
  <p>token user : </p><textarea>${usertoken}</textarea><br />
  <p>token admin : </p><textarea>${admintoken}</textarea><br />
  `);
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