"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

<<<<<<< HEAD
=======
var _sequelize = require("sequelize");

>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: {
    async getAllUsers(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
      const users = await models.users.findAll({
=======
      const users = await models.user.findAll({
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
        limit: args.limit || 5
      });
      return users;
    },

    async getUser(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
      const user = await models.users.findOne({
=======
      const user = await models.user.findOne({
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
        where: {
          id: args.id
        }
      });
      return user;
    },

<<<<<<< HEAD
    async getAllBooks(root, arg, {
      token,
      models
    }) {
      return await models.book.findAll();
=======
    async getAllBooks(root, args, {
      req,
      models
    }) {
      console.log(req);
      return await models.book.findAll({
        limit: args.limit || 5
      });
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    },

    async getBook(root, args, {
      req,
      models
    }) {
      return await models.book.findOne({
        where: {
          id: args.id
        }
      });
    },

    async getAllBorrows(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
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
      token,
      models
    }) {
      let borrow = await models.borrow.findOne({
        where: {
          id: args.id
        }
      });
      return borrow;
    }
=======
      let borrows = await models.borrow.findAll({
        limit: args.limit || 5,
        include: ['user', 'book']
      });
      return borrows;
    },

    async getBorrow(root, args, {
      req,
      models
    }) {
      let borrow = await models.borrow.findOne({
        where: {
          id: args.id
        },
        include: ['user', 'book']
      });
      return borrow;
    },

    async getLateBorrows(root, args, {
      req,
      models
    }) {
      let today = new Date();

      try {
        let borrows = await models.borrow.findAll({
          where: {
            [_sequelize.Op.and]: [{
              status: 'active'
            }, {
              date_return: {
                [_sequelize.Op.lte]: today
              }
            }]
          },
          include: ['user', 'book']
        });
        return borrows;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getAllComments(root, args, {
      req,
      models
    }) {
      const comments = await models.comment.findAll({
        limit: args.limit || 5
      });
      return comments;
    },

    async getCommentsByBook(root, args, {
      req,
      models
    }) {
      try {
        let comments = await models.comment.findAll({
          where: {
            book_id: args.book_id
          },
          include: ['user', 'book']
        });

        for await (let comment of comments) {
          comment.true = await models.opinion.count({
            where: {
              [_sequelize.Op.and]: [{
                comment_id: comment.dataValues.id
              }, {
                opinion: true
              }]
            }
          });
          comment.false = await models.opinion.count({
            where: {
              [_sequelize.Op.and]: [{
                comment_id: comment.dataValues.id
              }, {
                opinion: false
              }]
            }
          });
        }

        return comments;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },

    async getCommentsByUser(root, args, {
      req,
      models
    }) {
      try {
        let comments = await models.comment.findAll({
          where: {
            user_id: args.user_id
          },
          include: ['user', 'book']
        });

        for await (let comment of comments) {
          comment.true = await models.opinion.count({
            where: {
              [_sequelize.Op.and]: [{
                comment_id: comment.dataValues.id
              }, {
                opinion: true
              }]
            }
          });
          comment.false = await models.opinion.count({
            where: {
              [_sequelize.Op.and]: [{
                comment_id: comment.dataValues.id
              }, {
                opinion: false
              }]
            }
          });
        }

        return comments;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },

    async getOpinions(root, args, {
      req,
      models
    }) {
      let opinions = await models.opinion.findAll({
        where: {
          comment_id: args.comment_id
        },
        include: ['user', 'comment']
      });
      return opinions;
    } //     async login(root, args, { req, models }) {
    //       const user = await models.users.findOne( { where: { users_username:  args.users_username && users_password:   args.users_username } );
    //       return user;
    //     }

>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81

  },
  Mutation: {
    async createUser(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
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
=======
      let doesExist = await models.user.findOne({
        where: {
          [_sequelize.Op.or]: [{
            user_username: args.user_username
          }, {
            user_email: args.user_email
          }]
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
          id: (0, _v.default)(),
          user_username: args.user_username,
          user_email: args.user_email,
          user_password: args.user_password,
          user_role: 'user'
        };
        await models.user.create(newUser);
        return newUser;
      }
    },

    async updateUsername(root, args, {
      req,
      models
    }) {
      let user = await models.user.update({
        user_username: args.user_username
      }, {
        returning: true,
        where: {
          id: args.id
        }
      });
      return [...user][1][0];
    },

    async updatePassword(root, args, {
      req,
      models
    }) {
      let user = await models.user.update({
        user_password: args.user_password
      }, {
        returning: true,
        where: {
          id: args.id
        }
      });
      return [...user][1][0];
    },

    async updateEmail(root, args, {
      req,
      models
    }) {
      let user = await models.user.update({
        user_email: args.user_email
      }, {
        returning: true,
        where: {
          id: args.id
        }
      });
      return [...user][1][0];
    },

    async toggleUserRole(root, args, {
      req,
      models
    }) {
      let user = await models.user.findOne({
        where: {
          id: args.id
        }
      });
      let willBe = "";

      if (user.dataValues.user_role == 'user') {
        willBe = 'admin';
      } else {
        willBe = 'user';
      }

      let userUpdate = await models.user.update({
        user_role: willBe
      }, {
        returning: true,
        where: {
          id: args.id
        }
      });
      return [...userUpdate][1][0];
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    },

    async deleteUser(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
      await models.users.destroy({
=======
      await models.user.destroy({
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
        where: {
          id: args.id
        }
      });
      return "Deleted user with id: " + args.id;
    },

    async createBook(root, args, {
      req,
      models
    }) {
<<<<<<< HEAD
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
=======
      let doesExist = await models.book.findOne({
        where: {
          [_sequelize.Op.or]: [{
            book_ISBN10: args.book_ISBN10
          }, {
            book_ISBN13: args.book_ISBN13
          }]
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
      }
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    },

    async deleteBook(root, args, {
      req,
      models
    }) {
      await models.book.destroy({
        where: {
          id: args.id
        }
      });
      return "Deleted book with id: " + args.id;
    },

    async createBorrow(root, args, {
      req,
      models
    }) {
      let today = new Date();
      let date_return = new Date();
      date_return.setDate(today.getDate() + 30);
<<<<<<< HEAD
      const newBorrow = {
        id: (0, _v.default)(),
        users_id: args.users_id,
        book_id: args.book_id,
        date_borrowed: today.toUTCString(),
        date_return: date_return
      };
      await models.borrow.create(newBorrow);
      return newBorrow;
=======
      let borrowCount = await models.borrow.count({
        where: {
          [_sequelize.Op.and]: [{
            user_id: args.user_id
          }, {
            status: 'active'
          }]
        }
      });

      let lateReturn = async () => {
        let found = await models.borrow.findAll({
          where: {
            [_sequelize.Op.and]: [{
              user_id: args.user_id
            }, {
              status: 'active'
            }, {
              date_return: {
                [_sequelize.Op.lt]: today
              }
            }]
          }
        });

        if (found.length >= 0) {
          console.log('Aucun retard');

          if (borrowCount < 5) {
            const newBorrow = {
              id: (0, _v.default)(),
              user_id: args.user_id,
              book_id: args.book_id,
              date_borrowed: today,
              date_return: date_return
            };
            await models.borrow.create(newBorrow);
            return newBorrow;
          } else {
            throw new Error("Maximal simultaneous loans is 5");
          }
        } else {
          throw new Error(`Loans non-returned found for user: ${args.user_id}`);
        }
      };

      lateReturn();
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    },

    async deleteBorrow(root, args, {
      req,
      models
    }) {
      await models.borrow.destroy({
        where: {
          id: args.id
        }
      });
      return "Deleted borrow with id: " + args.id;
<<<<<<< HEAD
=======
    },

    async createComment(root, args, {
      req,
      models
    }) {
      let doesExist = await models.comment.findOne({
        where: {
          [_sequelize.Op.and]: [{
            user_id: args.user_id
          }, {
            book_id: args.book_id
          }]
        }
      });

      if (doesExist) {
        let error = [];

        if (doesExist.user_id == args.user_id || doesExist.book_id == args.book_id) {
          error.push(`User ${doesExist.user_id} has already write a comment on ${doesExist.book_id}.`);
          throw new Error(`Sorry ${error}`);
        }
      }

      const newComment = {
        id: (0, _v.default)(),
        user_id: args.user_id,
        book_id: args.book_id,
        comment_title: args.comment_title,
        comment_content: args.comment_content,
        comment_rating: args.comment_rating
      };
      await models.comment.create(newComment);
      return newComment;
    },

    async deleteComment(root, args, {
      req,
      models
    }) {
      try {
        await models.comment.destroy({
          where: {
            id: args.id
          }
        });
        return "Deleted comment with id: " + args.id;
      } catch (err) {
        throw new Error(err);
      }
    },

    async giveOpinion(root, args, {
      req,
      models
    }) {
      let doesExist = await models.opinion.findOne({
        where: {
          [_sequelize.Op.and]: [{
            user_id: args.user_id
          }, {
            comment_id: args.comment_id
          }]
        }
      });

      if (doesExist) {
        let error = [];

        if (doesExist.user_id == args.user_id || doesExist.comment_id == args.comment_id) {
          error.push(`User ${doesExist.user_id} has already give it's opinion on ${doesExist.comment_id}.`);
          throw new Error(`Sorry ${error}`);
        }
      } else {
        const newOpinion = {
          id: (0, _v.default)(),
          comment_id: args.comment_id,
          user_id: args.user_id,
          opinion: args.opinion
        };
        await models.opinion.create(newOpinion);
        return newOpinion;
      }
    },

    async bookReturn(root, args, {
      req,
      models
    }) {
      let doesExist = await models.borrow.findOne({
        where: {
          [_sequelize.Op.and]: [{
            id: args.id
          }, {
            status: 'active'
          }]
        }
      });

      if (doesExist) {
        let update = await models.borrow.update({
          status: 'returned'
        }, {
          returning: true,
          where: {
            id: args.id
          }
        });
        return [...update][1][0];
      } else {
        throw new Error(`No active borrow found with this id: ${args.id}`);
      }
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    }

  }
};
module.exports = resolvers;