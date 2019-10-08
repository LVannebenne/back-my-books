import express from "express";
//import graphqlHTTP from "express-graphql";
//import { buildSchema } from "graphql";
import { ApolloServer, gql } from 'apollo-server-express';
import Sequelize from "sequelize";
const sequelize = new Sequelize(`postgres://dev:dev@postgres:5432/library`);

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "../models";

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
const app = express();
server.applyMiddleware({ app });
models.sequelize.authenticate();

models.sequelize.sync();

app.listen(process.env.PORT, () => {
    console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})