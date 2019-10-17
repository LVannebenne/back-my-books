'use strict';

module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
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
  }, {
    timestamps: false
  });

  borrow.associate = function (models) {
    // associations can be defined here 
    borrow.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
      targetKey: 'id'
    });
    borrow.belongsTo(models.book, {
      foreignKey: 'book_id',
      as: 'book',
      targetKey: 'id'
    });
  };

  return borrow;
};