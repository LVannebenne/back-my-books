"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// borrow resolvers
const typeDef = `
    type Borrow {
<<<<<<< HEAD
        id: String
        users_id: Users
        book_id: Book
        date_borrowed: String
        date_return: String
=======
        id: ID!
        user_id: ID!
        book_id: ID!
        date_borrowed: String!
        date_return: String
        user: User
        book: Book
        status: String
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    }
`;
exports.typeDef = typeDef;