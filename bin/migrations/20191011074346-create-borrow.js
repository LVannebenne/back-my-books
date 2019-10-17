'use strict';

<<<<<<< HEAD
=======
const uuidv4 = require("uuid/v4");

>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        primaryKey: true,
<<<<<<< HEAD
        type: Sequelize.UUID
      },
      users_id: {
=======
        type: Sequelize.UUID,
        defaultValue: uuidv4()
      },
      user_id: {
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      book_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      date_borrowed: {
        type: Sequelize.DATE
      },
      date_return: {
        type: Sequelize.DATE
<<<<<<< HEAD
=======
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'active'
>>>>>>> 707c5e0156fb32f924b0e1f4b11ccdc76ada6e81
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('borrows');
  }
};