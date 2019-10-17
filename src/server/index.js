import express from "express";
import {
  ApolloServer
} from 'apollo-server-express';
import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "../models";
import jwt from "jsonwebtoken";

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
      models
    };
  },
  introspection: true,
  playground: true,
});
const app = express();

app.get('/', (req, res) => {
  //console.log(req.headers);
  res.sendFile(__dirname + "/front.html");
});
// let TestUser = {
//   username: "pipil",
//   password: "pol"
// }
app.get('/login', (req, res) => {
  // TestUser.logged = false;
  //console.log(req.headers)
  var token = jwt.sign({
    role: 'user'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });
  res.send(`token user : ${token}`)
  console.log(token)
  // jwt.sign({
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
});

// if (TestUser.logged == true) {
app.post('/login', (req, res) => {
  res.send(`<p>It Works</p>`);
});
// }
server.applyMiddleware({
  app,
  path: "/explore"
});
models.sequelize.authenticate();

models.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})
