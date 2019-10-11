"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: {
    async getAllUsers(root, args, {
      models
    }) {
      const users = await models.users.findAll({
        limit: args.limit || 5
      });
      return users;
    },

    async getUser(root, args, {
      models
    }) {
      const user = await models.users.findOne({
        where: {
          id: args.id
        }
      });
      console.log(user);
      return user;
    },

    async getAllBooks(root, arg, {
      models
    }) {
      return await models.book.findAll();
    },

    async getBook(root, args, {
      models
    }) {
      return await models.book.findOne({
        where: {
          id: args.id
        }
      });
    },

    async getAllBorrows(root, args, {
      models
    }) {
      let borrows = await models.borrow.findAll();

      for (let borrow of borrows) {
        borrow.dataValues.users_id = models.users.findOne({
          where: {
            id: borrow.users_id
          }
        });
        borrow.dataValues.book_id = models.book.findOne({
          where: {
            id: borrow.book_id
          }
        });
      }

      return borrows;
    },

    async getBorrow(root, args, {
      models
    }) {
      let borrow = await models.borrow.findOne({
        where: {
          id: args.id
        }
      }); //borrow.users_id = await models.users.findOne({ where: { id: borrow.users_id } });
      //borrow.book_id = await models.book.findOne({ where: { id: borrow.book_id } });

      console.log(borrow);
      return borrow;
    }

  },
  Mutation: {
    async createUser(root, args, {
      models
    }) {
      const newUser = {
        id: (0, _v.default)(),
        users_username: args.users_username,
        users_email: args.users_email,
        users_password: args.users_password,
        users_role: 'users',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await models.users.create(newUser);
      return newUser;
    },

    async createBook(root, args, {
      models
    }) {
      const newBook = {
        id: (0, _v.default)(),
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
      };
      await models.book.create(newBook);
      return newBook;
    },

    async createBorrow(root, args, {
      models
    }) {
      let today = new Date();
      let date_return = new Date();
      date_return.setDate(today.getDate() + 30);
      const newBorrow = {
        id: (0, _v.default)(),
        users_id: args.users_id,
        book_id: args.book_id,
        date_borrowed: today.toUTCString(),
        date_return: date_return
      };
      await models.borrow.create(newBorrow);
      return newBorrow;
    }

  }
};
module.exports = resolvers;