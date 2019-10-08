"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resolvers = {
  Query: {
    getAllUsers(root, args, {
      models
    }) {
      return models.users.findAll();
    },

    getUser(root, args, {
      models
    }) {
      return models.users.findOne({
        where: {
          id: args.id
        }
      });
    }

  },
  Mutation: {
    createUser(root, args, {
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
      console.log(newUser);
      models.users.create(newUser);
      return newUser;
    }

  }
};
module.exports = resolvers;