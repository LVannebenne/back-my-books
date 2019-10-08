"use strict";

var _apolloServerExpress = require("apollo-server-express");

var typeDefs = (0, _apolloServerExpress.gql)("\n    type Users {\n        id: String\n        users_username: String\n        users_email: String\n        users_role: String\n        createdAt: String\n        updatedAt: String\n    }\n    type Query {\n        getAllUsers: [Users]\n        getUser(id: String): Users\n    }\n    type Mutation {\n        createUser(users_username: String!,users_email: String!, users_password: String!): Users\n    }\n");
module.exports = typeDefs;