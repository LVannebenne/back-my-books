import uuidv4 from "uuid/v4";

const resolvers = {
    Query: {
        async getAllUsers(root, args, { token, models }) {
            const users = await models.user.findAll({ limit: args.limit || 5 });
            return users;
        },
        async getUser(root, args, { token, models }) {
            const user = await models.user.findOne({ where: { id: args.id } });
            return user;
        },
        async getAllBooks(root, arg, { token, models }) {
            return await models.book.findAll();
        },
        async getBook(root, args, { token, models }) {
            return await models.book.findOne({ where: { id: args.id } });

        },
        async getAllBorrows(root, args, { token, models }) {
            let borrows = await models.borrow.findAll({include: ['user','book']});
            /*for (let borrow of borrows) {
                borrow.dataValues.user_id = models.user.findOne({ where: { id: borrow.user_id } });
                borrow.dataValues.book_id = models.book.findOne({ where: { id: borrow.book_id } });
            }*/
            return borrows;
        },
        async getBorrow(root, args, { token, models }) {
            let borrow = await models.borrow.findOne({ where: { id: args.id }});
            return borrow;
        }
    },
    Mutation: {
        async createUser(root, args, { token, models }) {
            const newUser = {
                id: uuidv4(),
                user_username: args.user_username,
                user_email: args.user_email,
                user_password: args.user_password,
                user_role: 'user',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            await models.user.create(newUser);
            return newUser;
        },
        async deleteUser(root, args, { token, models }) {
            await models.user.destroy({ where: { id: args.id } })
            return "Deleted user with id: "+ args.id;
        },
        async createBook(root, args, { token, models }) {
            const newBook = {
                id: uuidv4(),
                book_title: args.book_title,
                book_subtitle: args.book_subtitle,
                book_ISBN10: args.book_ISBN10,
                book_ISBN13: args.book_ISBN13,
                book_authors: args.book_authors,
                book_editor: args.book_editor,
                book_format: args.book_format,
                book_lang: args.book_lang,
                book_cover: args.book_cover,
                book_stock: args.book_stock
            }
            await models.book.create(newBook);
            return newBook;
        },
        async deleteBook(root, args, { token, models }){
            await models.book.destroy({ where: { id: args.id } })
            return "Deleted book with id: "+ args.id;
        },
        async createBorrow(root, args, { token, models }) {
            let today = new Date();
            let date_return = new Date();
            date_return.setDate(today.getDate() + 30);
            const newBorrow = {
                id: uuidv4(),
                user_id: args.user_id,
                book_id: args.book_id,
                date_borrowed: today.toUTCString(),
                date_return: date_return
            }
            await models.borrow.create(newBorrow);
            return newBorrow;
        },
        async deleteBorrow(root, args, { token, models }) {
            await models.borrow.destroy({ where: { id: args.id } })
            return "Deleted borrow with id: "+ args.id;
        }
    }
}


module.exports = resolvers;


