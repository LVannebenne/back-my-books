"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDef = void 0;
// book
const typeDef = `
    type Book {
<<<<<<< HEAD
        id: String
        book_title: String
=======
        id: ID!
        book_title: String!
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
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