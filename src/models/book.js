'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    book_ISBN10: DataTypes.STRING,
    book_ISBN13: DataTypes.STRING,
    book_title: DataTypes.STRING,
    book_subtitle: DataTypes.STRING,
    book_authors: DataTypes.ARRAY(DataTypes.STRING),
    book_editor: DataTypes.STRING,
    book_format: DataTypes.STRING,
    book_lang: DataTypes.STRING,
    book_cover: DataTypes.TEXT,
    book_stock: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    // associations can be defined here
    book.hasMany(models.comment, {foreignKey: 'id', as: 'comment'})
  };
  return book;
};