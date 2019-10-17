'use strict';

<<<<<<< HEAD
=======
const uuidv4 = require("uuid/v4");

>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
<<<<<<< HEAD
        defaultValue: Sequelize.UUIDV4
=======
        defaultValue: uuidv4()
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
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