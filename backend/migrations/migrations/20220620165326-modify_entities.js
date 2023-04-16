const oldRoles = require('../seeds/roles');
const newRoles = require('../seeds/roles_20220618205139');
const userAdmin = require('../seeds/userAdmin');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {
            //Renombra las columnas de la tabla entiites
            await queryInterface.renameColumn('entities', 'nombre', 'name');
            await queryInterface.renameColumn('entities', 'nombre_antigua_firma', 'oldName');
            await queryInterface.renameColumn('entities', 'fecha_recuperacion', 'recoveryDate');
            await queryInterface.renameColumn('entities', 'bienes_servicios', 'goodsAndServices');
            await queryInterface.renameColumn('entities', 'fecha_inicio', 'startDate');
            await queryInterface.renameColumn('entities', 'calle', 'street');
            await queryInterface.renameColumn('entities', 'numero', 'streetNumber');
            await queryInterface.renameColumn('entities', 'entre_calle1', 'betweenStreet1');
            await queryInterface.renameColumn('entities', 'entre_calle2', 'betweenStreet2');
            await queryInterface.renameColumn('entities', 'barrio', 'neighborhood');
            await queryInterface.renameColumn('entities', 'latitud', 'latitude');
            await queryInterface.renameColumn('entities', 'longitud', 'longitude');

            //nueva tabla para realacionar las entitades a un usuario
            await queryInterface.createTable('userEntities', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
                userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
                entityId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'entities', key: 'id' } },
                createdAt: { type: Sequelize.DATE, allowNull: false },
                updatedAt: { type: Sequelize.DATE, allowNull: false },
                deletedAt: { type: Sequelize.DATE }
            }, { transaction: t })

            // renombra las columnanas en la tabla que realaciona las entidades con las ramas, subros y subrubros
            await queryInterface.renameColumn('entitySubLinesOfBusiness', 'entityId', 'entityLinesOfBusinessId');
            await queryInterface.renameColumn('entitySubLinesOfBusiness', 'lineOfBusinessId', 'sublinesOfBusinessId');

            //agrega las columnas de fecha en la tablas que que realaciona las entidades con las ramas, subros y subrubros

            await queryInterface.addColumn('entityLinesOfBusiness', 'createdAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entityLinesOfBusiness', 'updatedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entityLinesOfBusiness', 'deletedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'createdAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'updatedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });

            await queryInterface.addColumn('entitySubLinesOfBusiness', 'deletedAt', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }, { transaction: t });
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {

            //reestablece el nombbre las columnas de la tabla entiites
            await queryInterface.renameColumn('entities', 'name', 'nombre');
            await queryInterface.renameColumn('entities', 'oldName', 'nombre_antigua_firma');
            await queryInterface.renameColumn('entities', 'recoveryDate', 'fecha_recuperacion');
            await queryInterface.renameColumn('entities', 'goodsAndServices', 'bienes_servicios');
            await queryInterface.renameColumn('entities', 'startDate', 'fecha_inicio');
            await queryInterface.renameColumn('entities', 'street', 'calle');
            await queryInterface.renameColumn('entities', 'streetNumber', 'numero');
            await queryInterface.renameColumn('entities', 'betweenStreet1', 'entre_calle1');
            await queryInterface.renameColumn('entities', 'betweenStreet2', 'entre_calle2');
            await queryInterface.renameColumn('entities', 'neighborhood', 'barrio');
            await queryInterface.renameColumn('entities', 'latitude', 'latitud');
            await queryInterface.renameColumn('entities', 'longitude', 'longitud');

            await queryInterface.dropTable('userEntities', { transaction: t });

            // reestablece el nombbre las columnas de la tabla tabla que realaciona las entidades con las ramas, subros y subrubros
            await queryInterface.renameColumn('entitySubLinesOfBusiness', 'entityLinesOfBusinessId', 'entityId');
            await queryInterface.renameColumn('entitySubLinesOfBusiness', 'sublinesOfBusinessId', 'lineOfBusinessId');

            //se borran las columnas de fechas agregadas
            await queryInterface.removeColumn('entityLinesOfBusiness', 'createdAt', { transaction: t });
            await queryInterface.removeColumn('entityLinesOfBusiness', 'updatedAt', { transaction: t });
            await queryInterface.removeColumn('entityLinesOfBusiness', 'deletedAt', { transaction: t });

            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'createdAt', { transaction: t });
            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'updatedAt', { transaction: t });
            await queryInterface.removeColumn('entitySubLinesOfBusiness', 'deletedAt', { transaction: t });


        });

    }
}