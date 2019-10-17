"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// borrow resolvers
const typeDef = `
    type Borrow {
        id: ID!
        user_id: ID!
        book_id: ID!
        date_borrowed: String!
        date_return: String
        user: User
        book: Book
        status: String
    }
`;
exports.typeDef = typeDef;