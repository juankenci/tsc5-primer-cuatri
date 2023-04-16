'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.addColumn('entities', 'workersNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'womenNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'menNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'paidWorkersNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'volunteerWorkersNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'assistsNumber', { type: Sequelize.INTEGER, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'physicalSpaceSituation', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'propertySituation', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'baseOrganization', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'subsidy', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'website', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'relatedLinks', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'photoFile', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'audioFile', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'additionalInformation', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
      await queryInterface.addColumn('entities', 'joints', { type: Sequelize.STRING, allowNull: true }, { transaction: t });
  });
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.removeColumn('entities', 'workersNumber');
      await queryInterface.removeColumn('entities', 'womenNumber');
      await queryInterface.removeColumn('entities', 'menNumber');
      await queryInterface.removeColumn('entities', 'paidWorkersNumber');
      await queryInterface.removeColumn('entities', 'volunteerWorkersNumber');
      await queryInterface.removeColumn('entities', 'assistsNumber');
      await queryInterface.removeColumn('entities', 'physicalSpaceSituation');
      await queryInterface.removeColumn('entities', 'propertySituation');
      await queryInterface.removeColumn('entities', 'baseOrganization');
      await queryInterface.removeColumn('entities', 'subsidy');
      await queryInterface.removeColumn('entities', 'website');
      await queryInterface.removeColumn('entities', 'relatedLinks');
      await queryInterface.removeColumn('entities', 'photoFile');
      await queryInterface.removeColumn('entities', 'audioFile');
      await queryInterface.removeColumn('entities', 'additionalInformation');
      await queryInterface.removeColumn('entities', 'joints');
    });
  }
};
