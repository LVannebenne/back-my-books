"use strict";

var _apolloServerExpress = require("apollo-server-express");

var _userResolvers = require("./resolvers/user-resolvers");

var _bookResolvers = require("./resolvers/book-resolvers");

var _borrowResolvers = require("./resolvers/borrow-resolvers");

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
        createBook(
            book_title: String!,
            book_subtitle: String,
            book_ISBN10: String,
            book_ISBN13: String,
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
    }
`);
module.exports = typeDefs;