'use strict';

const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      user_username: "MyUsername",
      user_email: "MyEmail",
      user_password: "BadPassword",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      user_username: "AnotherUser",
      user_email: "My@mail.com",
      user_password: "BadPasswordOR",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      user_username: "User03",
      user_email: "user03@mail.com",
      user_password: "BadPasswordOR",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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