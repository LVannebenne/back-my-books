'use strict';
module.exports = (sequelize, DataTypes) => {
  const borrow = sequelize.define('borrow', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    users_id: DataTypes.STRING,
    book_id: DataTypes.STRING,
    date_borrowed: DataTypes.DATE,
    date_return: DataTypes.DATE
  }, {
    timestamps: false,
  });
  borrow.associate = function(models) {
    // associations can be defined here
    borrow.hasMany(models.users);
    borrow.hasMany(models.book);
    
  };
  return borrow;
};