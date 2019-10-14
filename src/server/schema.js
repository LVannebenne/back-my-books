import { gql } from "apollo-server-express";
import { typeDef as User } from "./resolvers/user-resolvers";
import { typeDef as Book } from "./resolvers/book-resolvers";
import { typeDef as Borrow } from "./resolvers/borrow-resolvers";
import { typeDef as Comment } from "./resolvers/comment-resolvers";

const typeDefs = gql(`
    ${User}
    ${Book}
    ${Borrow}
    ${Comment}
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
            book_authors: [String],
            book_editor: String,
            book_format: String,
            book_lang: String,
            book_cover: String,
            book_stock: Int
            ): Book
        createBorrow(
            user_id: ID,
            book_id: ID,
        ): Borrow
        createComment(
            user_id: ID!,
            book_id: ID!,
            comment_title: String!,
            comment_content: String!,
            comment_rating: Int!
        ): Comment
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