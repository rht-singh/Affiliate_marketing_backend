'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class query extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  query.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    email: DataTypes.STRING,
    appearance_order: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    query: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'query',
  });
  return query;
};