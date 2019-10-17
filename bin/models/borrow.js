'use strict';

module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
<<<<<<< HEAD
    users_id: DataTypes.UUID,
    book_id: DataTypes.UUID,
    date_borrowed: DataTypes.DATE,
    date_return: DataTypes.DATE
=======
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    book_id: {
      type: DataTypes.UUID,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    date_borrowed: DataTypes.DATE,
    date_return: DataTypes.DATE,
    status: DataTypes.STRING
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
  }, {
    timestamps: false
  });

  borrow.associate = function (models) {
    // associations can be defined here 
<<<<<<< HEAD
    borrow.hasMany(models.users, {
      foreignKey: 'id',
      as: 'users'
=======
    borrow.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
      targetKey: 'id'
    });
    borrow.belongsTo(models.book, {
      foreignKey: 'book_id',
      as: 'book',
      targetKey: 'id'
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
    });
  };

  return borrow;
};