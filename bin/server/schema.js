"use strict";

var _apolloServerExpress = require("apollo-server-express");

<<<<<<< HEAD
var _usersResolvers = require("./resolvers/users-resolvers");
=======
var _userResolvers = require("./resolvers/user-resolvers");
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81

var _bookResolvers = require("./resolvers/book-resolvers");

var _borrowResolvers = require("./resolvers/borrow-resolvers");

<<<<<<< HEAD
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
=======
var _commentResolvers = require("./resolvers/comment-resolvers");

var _opinionResolvers = require("./resolvers/opinion-resolvers");

const typeDefs = (0, _apolloServerExpress.gql)(`
    ${_userResolvers.typeDef}
    ${_bookResolvers.typeDef}
    ${_borrowResolvers.typeDef}
    ${_commentResolvers.typeDef}
    ${_opinionResolvers.typeDef}
    type Query {
        getAllUsers(limit: Int): [User]
        getUser(id: ID): User
        getAllBooks(limit: Int): [Book]
        getBook(id: ID): Book
        getAllBorrows(limit: Int): [Borrow]
        getBorrow(id: ID): Borrow
        getAllComments(limit: Int): [Comment]
        getCommentsByBook(book_id: ID): [Comment]
        getCommentsByUser(user_id: ID): [Comment]
        getOpinions(comment_id: ID): [Opinion]
        getLateBorrows: [Borrow]
    }
    type Mutation {
        createUser(
            user_username: String!,
            user_email: String!, 
            user_password: String!
            ): User
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
        createBook(
            book_title: String!,
            book_subtitle: String,
            book_ISBN10: String,
            book_ISBN13: String,
<<<<<<< HEAD
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
=======
            book_authors: [String]!,
            book_editor: String!,
            book_format: String!,
            book_lang: String!,
            book_cover: String!,
            book_stock: Int!
            ): Book
        createBorrow(
            user_id: ID!,
            book_id: ID!,
        ): Borrow
        createComment(
            user_id: ID!,
            book_id: ID!,
            comment_title: String!,
            comment_content: String!,
            comment_rating: Int!
        ): Comment
        deleteBook(
            id: ID!
        ): String
        deleteBorrow(
            id: ID!
        ): String
        deleteUser(
            id: ID!
        ): String
        deleteComment(
            id: ID!
        ): String
        giveOpinion(
            comment_id: ID!,
            user_id: ID!,
            opinion: Boolean!
        ): Opinion
        bookReturn(
            id: ID!
        ): Borrow
        updateUsername(
            id: ID!,
            user_username: String!
        ): User
        updatePassword(
            id: ID!,
            user_password: String!
        ): User
        updateEmail(
            id: ID!,
            user_email: String!
        ): User
        toggleUserRole(
            id: ID!
        ): User
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    }
`);
module.exports = typeDefs;