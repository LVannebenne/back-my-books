import uuidv4 from "uuid/v4";
import { Op } from "sequelize";

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
        async getAllBooks(root, args, { token, models }) {
            return await models.book.findAll({ limit: args.limit || 5 });
        },
        async getBook(root, args, { token, models }) {
            return await models.book.findOne({ where: { id: args.id } });

        },
        async getAllBorrows(root, args, { token, models }) {
            let borrows = await models.borrow.findAll({ limit: args.limit || 5, include: ['user', 'book'] });
            /*for (let borrow of borrows) {
                borrow.dataValues.user_id = models.user.findOne({ where: { id: borrow.user_id } });
                borrow.dataValues.book_id = models.book.findOne({ where: { id: borrow.book_id } });
            }*/
            return borrows;
        },
        async getBorrow(root, args, { token, models }) {
            let borrow = await models.borrow.findOne({ where: { id: args.id } });
            return borrow;
        },
        async getAllComments(root, args, { token, models }) {
            const comments = await models.comment.findAll({ limit: args.limit || 5 });
            return comments;
        },
        async getCommentsByBook(root, args, { token, models }) {
            try {
                let comments = await models.comment.findAll({ where: { book_id: args.book_id }, include: ['user', 'book'] });
                for await (let comment of comments) {
                    comment.true = await models.opinion.count({
                        where: {
                            [Op.and]: [{ comment_id: comment.dataValues.id }, { opinion: true }]
                        }
                    });
                    comment.false = await models.opinion.count({
                        where: {
                            [Op.and]: [{ comment_id: comment.dataValues.id }, { opinion: false }]
                        }
                    });
                }
                return comments;
            }
            catch (err) { console.log(err); throw new Error(err) }
        },
        async getCommentsByUser(root, args, { token, models }) {
            try {
                let comments = await models.comment.findAll({ where: { user_id: args.user_id }, include: ['user', 'book'] });
                for await (let comment of comments) {
                    comment.true = await models.opinion.count({
                        where: {
                            [Op.and]: [{ comment_id: comment.dataValues.id }, { opinion: true }]
                        }
                    });
                    comment.false = await models.opinion.count({
                        where: {
                            [Op.and]: [{ comment_id: comment.dataValues.id }, { opinion: false }]
                        }
                    });
                }
                return comments;
            }
            catch (err) { console.log(err); throw new Error(err) }
        },
        async getOpinions(root, args, { token, models }) {
            let opinions = await models.opinion.findAll({ where: { comment_id: args.comment_id }, include: ['user', 'comment'] });
            return opinions;
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
            return "Deleted user with id: " + args.id;
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
        async deleteBook(root, args, { token, models }) {
            await models.book.destroy({ where: { id: args.id } })
            return "Deleted book with id: " + args.id;
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
            return "Deleted borrow with id: " + args.id;
        },
        async createComment(root, args, { token, models }) {
            const newComment = {
                id: uuidv4(),
                user_id: args.user_id,
                book_id: args.book_id,
                comment_title: args.comment_title,
                comment_content: args.comment_content,
                comment_rating: args.comment_rating,
            }
            await models.comment.create(newComment);
            return newComment;
        },
        async giveOpinion(root, args, { token, models }) {
            const newOpinion = {
                id: uuidv4(),
                comment_id: args.comment_id,
                user_id: args.user_id,
                opinion: args.opinion,
            }
            await models.opinion.create(newOpinion);
            return newOpinion;
        }
    }
}


module.exports = resolvers;


