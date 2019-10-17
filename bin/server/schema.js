"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _usersResolvers = require("./resolvers/users-resolvers");

var _bookResolvers = require("./resolvers/book-resolvers");

var _borrowResolvers = require("./resolvers/borrow-resolvers");

const typeDefs = (0, _apolloServerExpress.gql)(`
    ${_usersResolvers.typeDef}
    ${_bookResolvers.typeDef}
    ${_borrowResolvers.typeDef}
    type Query {
        getAllUsers(limit: Int): [Users]
        getUser(id: String): Users
        getAllBooks: [Book]
        getBook(id: String): Book
        getAllBorrows: [Borrow]
        getBorrow(id: String): Borrow
    }
    type Mutation {
        createUser(
            users_username: String!,
            users_email: String!, 
            users_password: String!
            ): Users
        createBook(
            book_title: String!,
            book_subtitle: String,
            book_ISBN10: String,
            book_ISBN13: String,
            book_authors: [String],
            book_editor: String,
            book_format: String,
            book_lang: String,
            book_cover: String,
            book_stock: Int
            ): Book
        createBorrow(
            users_id: ID,
            book_id: ID,
        ): Borrow
        deleteBook(
            id: ID
        ): String
        deleteBorrow(
            id: ID
        ): String
        deleteUser(
            id: ID
        ): String
    }
`);
module.exports = typeDefs;