'use strict';

<<<<<<< HEAD
=======
const uuidv4 = require("uuid/v4");

>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
<<<<<<< HEAD
        type: Sequelize.UUID
=======
        type: Sequelize.UUID,
        defaultValue: uuidv4()
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
      },
      book_ISBN10: {
        type: Sequelize.STRING
      },
      book_ISBN13: {
        type: Sequelize.STRING
      },
      book_title: {
        type: Sequelize.STRING
      },
      book_subtitle: {
        type: Sequelize.STRING
      },
      book_authors: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      book_editor: {
        type: Sequelize.STRING
      },
      book_format: {
        type: Sequelize.STRING
      },
      book_lang: {
        type: Sequelize.STRING
      },
      book_cover: {
        type: Sequelize.TEXT
      },
      book_stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books');
  }
};