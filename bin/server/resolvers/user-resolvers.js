"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// user
const typeDef = `
    type User {
        id: ID!
        user_username: String
        user_email: String
        user_role: String
        createdAt: String
        updatedAt: String
    }
`;
exports.typeDef = typeDef;