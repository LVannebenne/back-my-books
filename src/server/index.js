import express from "express";
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "../models";


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        // try to retrieve a user with the token
        // const user = getUser(token);

        // add the user to the context
        return { token, models };
    },
});
const app = express();

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

server.applyMiddleware({ app, path: "/explore" });
models.sequelize.authenticate();

models.sequelize.sync();

app.listen(process.env.PORT, () => {
    console.log(`🦄 Listening on PORT: ${process.env.PORT}`)
})