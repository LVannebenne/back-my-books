'use strict';

module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    users_id: DataTypes.UUID,
    book_id: DataTypes.UUID,
    date_borrowed: DataTypes.DATE,
    date_return: DataTypes.DATE
  }, {
    timestamps: false
  });

  borrow.associate = function (models) {
    // associations can be defined here 
    borrow.hasMany(models.users, {
      foreignKey: 'id',
      as: 'users'
    });
  };

  return borrow;
};