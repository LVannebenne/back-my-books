'use strict';

module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    users_username: DataTypes.STRING,
    users_email: DataTypes.STRING,
    users_password: DataTypes.STRING,
    users_role: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING
  }, {});

  users.associate = function (models) {// associations can be defined here
  };

  users.removeAttribute('id');
  return users;
};