// comment resolvers

export const typeDef = `
    type Comment {
        id: ID
        user_id: ID
        book_id: ID
        comment_title: String
        comment_content: String
        comment_rating: Int
        user: User
        book: Book
    }
`;
