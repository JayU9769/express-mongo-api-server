'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    status: DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};