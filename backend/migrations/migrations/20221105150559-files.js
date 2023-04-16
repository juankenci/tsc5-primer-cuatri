"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.TEXT,
      },
      entityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "entities",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.removeColumn("entities", "photoFile");
    await queryInterface.removeColumn("entities", "audioFile");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("files");
    await queryInterface.addColumn("entities", "photoFile");
    await queryInterface.addColumn("entities", "audioFile");
  },
};
