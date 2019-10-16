'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_username: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.borrow, {
      foreignKey: 'id',
      as: 'borrow'
    });
    user.hasMany(models.comment, {
      foreignKey: 'id',
      as: 'comment'
    });
  };

  return user;
};