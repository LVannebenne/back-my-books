// borrow resolvers

export const typeDef = `
    type Borrow {
        id: String
        users_id: Users
        book_id: Book
        date_borrowed: String
        date_return: String
    }
`;