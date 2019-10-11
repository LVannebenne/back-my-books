"use strict";

var _apolloServerExpress = require("apollo-server-express");

const typeDefs = (0, _apolloServerExpress.gql)(`
    type Users {
        id: String
        users_username: String
        users_email: String
        users_role: String
        createdAt: String
        updatedAt: String
    }
    type Book {
        id: String
        book_title: String
        book_ISBN10: String
        book_ISBN13: String
    }
    type Borrow {
        id: String
        users_id: Users
        book_id: Book
        date_borrowed: String
        date_return: String
    }
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
            users_id: String,
            book_id: String,
        ): Borrow
    }
`);
module.exports = typeDefs;