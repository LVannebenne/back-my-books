'use strict';

const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4()
      },
      users_username: {
        type: Sequelize.STRING
      },
      users_email: {
        type: Sequelize.STRING
      },
      users_password: {
        type: Sequelize.STRING
      },
      users_role: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};