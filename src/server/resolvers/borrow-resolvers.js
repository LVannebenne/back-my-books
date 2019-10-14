// borrow resolvers

export const typeDef = `
    type Borrow {
        id: ID!
        user_id: ID!
        book_id: ID!
        date_borrowed: String!
        date_return: String
        user: User
        book: Book
    }
`;