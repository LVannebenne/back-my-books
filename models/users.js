'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    users_id: DataTypes.UUID,
    users_username: DataTypes.STRING,
    users_email: DataTypes.STRING,
    users_password: DataTypes.STRING,
    users_role: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};