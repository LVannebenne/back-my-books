"use strict";

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: {
    getAllUsers: function getAllUsers(root, args, _ref) {
      var models = _ref.models;
      return models.users.findAll();
    },
    getUser: function getUser(root, args, _ref2) {
      var models = _ref2.models;
      return models.users.findOne({
        where: {
          id: args.id
        }
      });
    }
  },
  Mutation: {
    createUser: function createUser(root, args, _ref3) {
      var models = _ref3.models;
      var id = (0, _v["default"])();
      var newUser = {
        id: id,
        users_username: args.users_username,
        users_email: args.users_email,
        users_password: args.users_password,
        users_role: 'users',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log(newUser);
      return models.users.create();
    }
  }
};
module.exports = resolvers;