import { gql } from "apollo-server-express";

const typeDefs = gql(`
    type Users {
        id: String
        users_username: String
        users_email: String
        users_role: String
        createdAt: String
        updatedAt: String
    }
    type Query {
        getAllUsers: [Users]
        getUser(id: String): Users
    }
    type Mutation {
        createUser(users_username: String!,users_email: String!, users_password: String!): Users
    }
`);

module.exports = typeDefs;