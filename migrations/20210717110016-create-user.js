'use strict';


module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
   
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
      },
      Name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      Phone: {
        type: DataTypes.STRING
      },
      Pasword:{
        type:DataTypes.STRING,
        allowNull:false
      },

      otp: {
        type: DataTypes.INTEGER
      },
      verified: {
        type: DataTypes.STRING
      },
      time: {
        type: DataTypes.STRING
      },
    
      device: {
        type: DataTypes.STRING(1234)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};