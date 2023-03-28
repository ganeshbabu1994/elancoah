'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Test1.init({
    ID: DataTypes.INTEGER,
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Test1',
  });
  return Test1;
};