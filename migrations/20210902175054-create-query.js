'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('queries', {
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
      appearance_order: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
      },
      query: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable('queries');
  }
};