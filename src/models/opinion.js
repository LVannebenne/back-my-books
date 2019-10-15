'use strict';
module.exports = (sequelize, DataTypes) => {
  const opinion = sequelize.define('opinion', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    comment_id: {
      type: DataTypes.UUID,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    opinion: DataTypes.BOOLEAN
  }, {});
  opinion.associate = function(models) {
    // associations can be defined here
    opinion.belongsTo(models.user, { foreignKey: 'user_id', as : 'user', targetKey: 'id'});
    opinion.belongsTo(models.comment, { foreignKey: 'comment_id', as: 'comment', targetKey: 'id'});
  };
  return opinion;
};