'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class why_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  why_join.init({
    join_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    appearance_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'why_join',
  });
  return why_join;
};