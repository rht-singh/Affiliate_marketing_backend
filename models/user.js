'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    Pasword:{
      type:DataTypes.STRING(1234),
      allowNull:false
    },
    email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    verified: DataTypes.STRING,
    time: DataTypes.STRING,
    
    device: DataTypes.STRING(1234)
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};