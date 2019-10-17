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
  res.sendFile(__dirname + "/front.html");
});

app.get('/login', (req, res) => {
  let usertoken = jwt.sign({
    role: 'user'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });
  let admintoken = jwt.sign({
    role: 'admin'
  }, process.env.SECRET, {
    algorithm: 'HS256'
  });
  res.send(`
  <p>token user : </p><textarea>${usertoken}</textarea><br />
  <p>token admin : </p><textarea>${admintoken}</textarea><br />
  `)
});

server.applyMiddleware({
  app,
  path: "/explore"
});

models.sequelize.authenticate();

models.sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})
