"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// comment resolvers
const typeDef = `
    type Comment {
        id: ID
        user_id: ID
        book_id: ID
        comment_title: String
        comment_content: String
        comment_rating: Int
        user: User
        book: Book
        true: Int
        false: Int
    }
`;
exports.typeDef = typeDef;