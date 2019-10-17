'use strict';

module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
  const users = sequelize.define('users', {
=======
  const user = sequelize.define('user', {
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
<<<<<<< HEAD
    users_username: DataTypes.STRING,
    users_email: DataTypes.STRING,
    users_password: DataTypes.STRING,
    users_role: DataTypes.STRING,
=======
    user_username: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_role: DataTypes.STRING,
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});

<<<<<<< HEAD
  users.associate = function (models) {// associations can be defined here
  };

  return users;
=======
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
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
};