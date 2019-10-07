import express from "express";
//import graphqlHTTP from "express-graphql";
//import { buildSchema } from "graphql";
import { ApolloServer, gql } from 'apollo-server-express';
import Sequelize from "sequelize";
const sequelize = new Sequelize(`postgres://dev:dev@postgres:5432/library`);
const app = express();
import UserModel from "../models/users";

const typeDefs = gql(`
    type Query {
        hello: String
    }
`);

const resolvers = {
    Query: {
        hello: () => 'Hello world new !',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

/* app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})); */

sequelize.authenticate().then(() => {
    console.log('Connection established !!');
    UserModel.findAll(user => console.log(user));
})
    .catch(err => {
        console.error(`Unable to log :`);
        console.error(err);
    }
);


app.listen(process.env.PORT, () => {
    console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})
/*
graphql(schema, '{hello}', root).then((response) => {
    console.log(response);
    console.log(process.env.MY_SECRET);
}); */