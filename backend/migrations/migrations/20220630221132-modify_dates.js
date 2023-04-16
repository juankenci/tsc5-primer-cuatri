const oldRoles = require('../seeds/roles');
const newRoles = require('../seeds/roles_20220618205139');
const userAdmin = require('../seeds/userAdmin');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {

            await queryInterface.removeColumn('entityLinesOfBusiness', 'createdAt', { transaction: t });
            await queryInterface.removeColumn('entityLinesOfBusiness', 'updatedAt', { transaction: t });
            await queryInterface.removeColumn('entityLinesOfBusiness', 'deletedAt', { transaction: t });
            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'createdAt', { transaction: t });
            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'updatedAt', { transaction: t });
            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'deletedAt', { transaction: t });


            //corrige el tipo de columnas
            await queryInterface.addColumn('entityLinesOfBusiness', 'createdAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entityLinesOfBusiness', 'updatedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entityLinesOfBusiness', 'deletedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'createdAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'updatedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'deletedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            }, { transaction: t });
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {

            //reestablece el tupo de las columnas de las tablas
            await queryInterface.changeColumn('entityLinesOfBusiness', 'createdAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.changeColumn('entityLinesOfBusiness', 'updatedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.changeColumn('entityLinesOfBusiness', 'deletedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.changeColumn('entitySubLinesOfBusiness', 'createdAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.changeColumn('entitySubLinesOfBusiness', 'updatedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.changeColumn('entitySubLinesOfBusiness', 'deletedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

        });

    }
}