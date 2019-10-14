'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      users_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      book_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id',
        },
      },
      date_borrowed: {
        type: Sequelize.DATE
      },
      date_return: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('borrows');
  }
};