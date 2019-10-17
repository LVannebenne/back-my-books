"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// book
const typeDef = `
    type Book {
        id: ID!
        book_title: String!
        book_subtitle: String
        book_ISBN10: String
        book_ISBN13: String
        book_authors: [String]
        book_editor: String
        book_format: String
        book_lang: String
        book_cover: String
        book_stock: Int
    }
`;
exports.typeDef = typeDef;