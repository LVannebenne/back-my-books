import uuidv4 from "uuid/v4";
import { Op } from "sequelize";
import auth from "./auth";


const resolvers = {
    Query: {
        async getAllUsers(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            const users = await models.user.findAll({ limit: args.limit || 5 });
            return users;
        },
        async getUser(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            const user = await models.user.findOne({ where: { id: args.id } });
            return user;
        },
        async getAllBooks(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
            return await models.book.findAll({ limit: args.limit || 5 });
        },
        async getBook(root, args, { req, models }) {
            return await models.book.findOne({ where: { id: args.id } });

        },
        async getAllBorrows(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let borrows = await models.borrow.findAll({ limit: args.limit || 5, include: ['user', 'book'] });
            return borrows;
        },
        async getBorrow(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let borrow = await models.borrow.findOne({ where: { id: args.id }, include: ['user', 'book'] });
            return borrow;
        },
        async getLateBorrows(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let today = new Date();
            try {
                let borrows = await models.borrow.findAll({
                    where: {
                        [Op.and]: [{ status: 'active' }, { date_return: { [Op.lte]: today } }]
                    },
                    include: ['user', 'book']
                })
                return borrows;
            } catch (err) {
                throw new Error(err);
            }

        },
        async getAllComments(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
            const comments = await models.comment.findAll({ limit: args.limit || 5 });
            return comments;
        },
        async getCommentsByBook(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
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
            catch (err) { throw new Error(err) }
        },
        async getCommentsByUser(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
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
            catch (err) { throw new Error(err) }
        },
        async getOpinions(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
            let opinions = await models.opinion.findAll({ where: { comment_id: args.comment_id }, include: ['user', 'comment'] });
            return opinions;
        },
        //     async login(root, args, { req, models }) {
        //       const user = await models.users.findOne( { where: { users_username:  args.users_username && users_password:   args.users_username } );
        //       return user;
        //     }
    },
    Mutation: {
        async createUser(root, args, { req, models }) {
            auth(req, process.env.SECRET, "all")
            let doesExist = await models.user.findOne({
                where: {
                    [Op.or]:
                        [{ user_username: args.user_username }, { user_email: args.user_email }]
                }
            });
            if (doesExist) {
                let error = [];
                if (doesExist.user_email == args.user_email) {
                    error.push('Email is already taken ');
                }
                if (doesExist.user_username == args.user_username) {
                    error.push('Username is already taken ');
                }
                throw new Error(`Sorry ${error}`);
            } else {
                const newUser = {
                    id: uuidv4(),
                    user_username: args.user_username,
                    user_email: args.user_email,
                    user_password: args.user_password,
                    user_role: 'user',
                }
                await models.user.create(newUser);
                return newUser;
            }

        },
        async updateUsername(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            let user = await models.user.update(
                { user_username: args.user_username },
                {
                    returning: true, where: { id: args.id }
                }
            );
            return [...user][1][0];
        },
        async updatePassword(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            let user = await models.user.update(
                { user_password: args.user_password },
                {
                    returning: true, where: { id: args.id }
                }
            );
            return [...user][1][0];
        },
        async updateEmail(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            let user = await models.user.update(
                { user_email: args.user_email },
                {
                    returning: true, where: { id: args.id }
                }
            );
            return [...user][1][0];
        },
        async toggleUserRole(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let user = await models.user.findOne({ where: { id: args.id } })
            let willBe = "";
            if (user.dataValues.user_role == 'user') {
                willBe  = 'admin';
            } else {
                willBe  = 'user';
            }
            let userUpdate = await models.user.update(
                { user_role: willBe },
                {
                    returning: true, where: { id: args.id }
                }
            );
            return [...userUpdate][1][0];
        },
        async deleteUser(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            await models.user.destroy({ where: { id: args.id } })
            return "Deleted user with id: " + args.id;
        },
        async createBook(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let doesExist = await models.book.findOne({
                where: {
                    [Op.or]:
                        [{ book_ISBN10: args.book_ISBN10 }, { book_ISBN13: args.book_ISBN13 }]
                }
            });
            if (doesExist) {
                let error = [];
                if (doesExist.book_ISBN10 == args.book_ISBN10) {
                    error.push(`ISBN10: ${doesExist.book_ISBN10} is already in the database `);
                }
                if (doesExist.book_ISBN13 == args.book_ISBN13) {
                    error.push(`ISBN13: ${doesExist.book_ISBN13} is already in the database `);
                }
                throw new Error(`Sorry ${error}`);
            } else {
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
            }

        },
        async deleteBook(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            await models.book.destroy({ where: { id: args.id } })
            return "Deleted book with id: " + args.id;
        },
        async createBorrow(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let today = new Date();
            let date_return = new Date();
            date_return.setDate(today.getDate() + 30);
            let borrowCount = await models.borrow.count({
                where: {
                    [Op.and]: [{ user_id: args.user_id }, { status: 'active' }]
                }
            });
            let lateReturn = async () => {
                let found = await models.borrow.findAll({
                    where: {
                        [Op.and]: [
                            { user_id: args.user_id },
                            { status: 'active' },
                            { date_return: { [Op.lt]: today } }
                        ]
                    }
                });
                if (found.length >= 0) {
                    if (borrowCount < 5) {
                        const newBorrow = {
                            id: uuidv4(),
                            user_id: args.user_id,
                            book_id: args.book_id,
                            date_borrowed: today,
                            date_return: date_return
                        }
                        await models.borrow.create(newBorrow);
                        return newBorrow;
                    } else {
                        throw new Error("Maximal simultaneous loans is 5");
                    }
                } else {
                    throw new Error(`Loans non-returned found for user: ${args.user_id}`);
                }
            }
            lateReturn();
        },
        async deleteBorrow(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            await models.borrow.destroy({ where: { id: args.id } })
            return "Deleted borrow with id: " + args.id;
        },
        async createComment(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            let doesExist = await models.comment.findOne({
                where: {
                    [Op.and]: [{ user_id: args.user_id }, { book_id: args.book_id }]
                }
            })
            if (doesExist) {
                let error = [];
                if (doesExist.user_id == args.user_id || doesExist.book_id == args.book_id) {
                    error.push(`User ${doesExist.user_id} has already write a comment on ${doesExist.book_id}.`);
                    throw new Error(`Sorry ${error}`);
                }
            }
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
        async deleteComment(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            try {
                await models.comment.destroy({ where: { id: args.id } })
                return "Deleted comment with id: " + args.id;
            } catch (err) {
                throw new Error(err);
            }

        },
        async giveOpinion(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin","user"])
            let doesExist = await models.opinion.findOne({
                where: {
                    [Op.and]: [{ user_id: args.user_id }, { comment_id: args.comment_id }]
                }
            })
            if (doesExist) {
                let error = [];
                if (doesExist.user_id == args.user_id || doesExist.comment_id == args.comment_id) {
                    error.push(`User ${doesExist.user_id} has already give it's opinion on ${doesExist.comment_id}.`);
                    throw new Error(`Sorry ${error}`);
                }

            } else {
                const newOpinion = {
                    id: uuidv4(),
                    comment_id: args.comment_id,
                    user_id: args.user_id,
                    opinion: args.opinion,
                }
                await models.opinion.create(newOpinion);
                return newOpinion;
            }
        },
        async bookReturn(root, args, { req, models }) {
            auth(req, process.env.SECRET, ["admin"])
            let doesExist = await models.borrow.findOne({
                where: {
                    [Op.and]: [{ id: args.id }, { status: 'active' }]
                }
            })
            if (doesExist) {
                let update = await models.borrow.update({
                    status: 'returned'
                }, {
                    returning: true, where: { id: args.id }
                });
                return [...update][1][0];
            } else {
                throw new Error(`No active borrow found with this id: ${args.id}`);
            }
        }
    }
}




module.exports = resolvers;
