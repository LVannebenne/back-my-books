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
    const token = req.headers.authorization || ''; // try to retrieve a user with the token
    // const user = getUser(token);
    // add the user to the context

    return {
      token,
      models: _models.default
    };
  }
});
const app = (0, _express.default)();
app.get('/', (req, res) => {
  console.log(req.headers);
  res.send("hello");
}); // let TestUser = {
//   username: "pipil",
//   password: "pol"
// }

app.get('/login', (req, res) => {
  // TestUser.logged = false;
  console.log(req.headers);
  console.log("this is the auth");

  var token = _jsonwebtoken.default.sign({
    thisisthepayload: 'charchutil'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });

  console.log(token); // jwt.sign({
  //   payload: 'freeeze!'
  // }, privateKey, {
  //   algorithm: 'RS256'
  // }, function(err, token) {
  //   console.log(token);
  // });
  // res.send(`
  // <form method="POST"action="./auth.js">
  //     <input type="text" name="test" placeholder="Login">
  //     <input type="password" name="pass" placeholder="Password">
  //     <input type="submit" value="login">
  // </form>`);
}); // if (TestUser.logged == true) {

app.post('/login', (req, res) => {
  res.send(`<p>It Works</p>`);
}); // }

server.applyMiddleware({
  app,
  path: "/explore"
});

_models.default.sequelize.authenticate();

_models.default.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`🦄 Listening on PORT: ${process.env.PORT}`);
});