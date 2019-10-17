'use strict';

module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
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

<<<<<<< HEAD
  book.associate = function (models) {// associations can be defined here
=======
  book.associate = function (models) {
    // associations can be defined here
    book.hasMany(models.comment, {
      foreignKey: 'id',
      as: 'comment',
      targetKey: 'book_id'
    });
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
  };

  return book;
};