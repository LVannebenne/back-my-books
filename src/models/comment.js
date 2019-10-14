'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    user_id: DataTypes.UUID,
    comment_title: DataTypes.STRING,
    comment_content: DataTypes.STRING,
    comment_rating: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.user, { foreignKey: 'id', as : 'user'});
    comment.belongsTo(models.book, { foreignKey: 'id', as : 'book'});
  };
  return comment;
};