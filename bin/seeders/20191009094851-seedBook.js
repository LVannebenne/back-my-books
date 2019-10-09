'use strict';

const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [{
      id: uuidv4(),
      book_ISBN10: "9780451524935",
      book_ISBN13: "0451524934",
      book_title: "1984",
      book_subtitle: "",
      book_authors: ["George Orwell"],
      book_editor: "Signet Classic",
      book_format: "Broché",
      book_lang: "English",
      book_cover: "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",
      book_stock: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};