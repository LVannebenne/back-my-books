"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// users
const typeDef = `
    type Users {
        id: ID!
        users_username: String
        users_email: String
        users_role: String
        createdAt: String
        updatedAt: String
    }
`;
exports.typeDef = typeDef;