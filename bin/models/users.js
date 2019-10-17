'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    users_username: DataTypes.STRING,
    users_email: DataTypes.STRING,
    users_password: DataTypes.STRING,
    users_role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  users.associate = function (models) {// associations can be defined here
  };

  return users;
};