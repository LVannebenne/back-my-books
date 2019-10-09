"use strict";

var _apolloServerExpress = require("apollo-server-express");

const typeDefs = (0, _apolloServerExpress.gql)(`
    type Users {
        id: String
        users_username: String
        users_email: String
        users_role: String
        createdAt: String
        updatedAt: String
    }
    type Book {
        id: String
        book_ISBN10: String
        book_ISBN13: String
    }
    type Query {
        getAllUsers: [Users]
        getUser(id: String): Users
        getAllBooks: [Book]
    }
    type Mutation {
        createUser(users_username: String!,users_email: String!, users_password: String!): Users
    }
`);
module.exports = typeDefs;