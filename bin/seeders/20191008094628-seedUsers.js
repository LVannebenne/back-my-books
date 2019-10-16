'use strict';

const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      users_username: "MyUsername",
      users_email: "MyEmail",
      users_password: "BadPassword",
      users_role: "users",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidv4(),
      users_username: "AnotherUser",
      users_email: "My@mail.com",
      users_password: "BadPasswordOR",
      users_role: "users",
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