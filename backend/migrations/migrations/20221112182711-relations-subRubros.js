'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("entityLinesSublinesOfBusiness", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "entities",
          key: "id",
        },
      },
      linesOfBusinessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "linesOfBusiness",
          key: "id",
        },
      },
      sublinesOfBusinessId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sublinesOfBusiness",
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
    }, {
      uniqueKeys: {
          actions_unique: {
              fields: ['entityId', 'linesOfBusinessId', 'sublinesOfBusinessId']
          }
      }
    });

    await queryInterface.addColumn("entities", "referer", { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn("entities", "cellphone", { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn("entities", "phone", { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn("entities", "email", { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn("entities", "otherWorkersNumber", { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.removeColumn("entities", "oldName");
    await queryInterface.removeColumn("entities", "betweenStreet1");
    await queryInterface.removeColumn("entities", "betweenStreet2");
    await queryInterface.addColumn("entities", "betweenStreets", { type: Sequelize.STRING, allowNull: false });
    await queryInterface.dropTable('entitySubLinesOfBusiness');
    await queryInterface.dropTable('entityLinesOfBusiness');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("entities", "referer");
    await queryInterface.removeColumn("entities", "cellphone");
    await queryInterface.removeColumn("entities", "phone");
    await queryInterface.removeColumn("entities", "email");
    await queryInterface.removeColumn("entities", "otherWorkersNumber");
    await queryInterface.dropTable('entityLinesOfBusiness');
    await queryInterface.addColumn("entities", "oldName");
    await queryInterface.addColumn("entities", "betweenStreet1");
    await queryInterface.addColumn("entities", "betweenStreet2");
    await queryInterface.removeColumn("entities", "betweenStreets");
  }
};
