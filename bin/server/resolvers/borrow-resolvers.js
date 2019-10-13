"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// borrow resolvers
const typeDef = `
    type Borrow {
        id: String
        users_id: Users
        book_id: Book
        date_borrowed: String
        date_return: String
    }
`;
exports.typeDef = typeDef;