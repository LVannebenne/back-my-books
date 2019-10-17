'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.UUID,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    comment_title: DataTypes.STRING,
    comment_content: DataTypes.STRING,
    comment_rating: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.user, { foreignKey: 'user_id', as : 'user', targetKey: 'id' });
    comment.belongsTo(models.book, { foreignKey: 'book_id', as : 'book', targetKey: 'id' });
    comment.hasMany(models.opinion, { foreignKey: 'id', as: 'opinion', targetKey: 'comment_id' });
  };
  return comment;
};