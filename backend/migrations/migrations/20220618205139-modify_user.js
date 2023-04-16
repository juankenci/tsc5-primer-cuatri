const oldRoles = require('../seeds/roles');
const newRoles = require('../seeds/roles_20220618205139');
const userAdmin = require('../seeds/userAdmin');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {
            //Borra los registros de los usuarios creados para agregar nuevas columnas
            await queryInterface.bulkDelete('users', null, { transaction: t })

            //Borra la columan admin para ser reemplazada por rolesId
            await queryInterface.removeColumn('users', 'admin', { transaction: t });

            // Se agregan columnas para un usuario rol, nombre, apellido, email
            await queryInterface.addColumn('users', 'roleId', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            }, { transaction: t });

            await queryInterface.addColumn('users', 'firstName', { type: Sequelize.STRING, allowNull: false }, { transaction: t });
            await queryInterface.addColumn('users', 'lastName', { type: Sequelize.STRING, allowNull: false }, { transaction: t });
            await queryInterface.addColumn('users', 'email', { type: Sequelize.STRING, allowNull: false }, { transaction: t });

            //Borra los registros en los roles y crear los nuevos
            await queryInterface.bulkDelete('roles', null, { transaction: t })
            await queryInterface.bulkInsert('roles', newRoles, { transaction: t });

            //crea el usuario admin
            await queryInterface.bulkInsert('users', userAdmin, { transaction: t });

        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {

            await queryInterface.bulkDelete('users', null, { transaction: t });

            await queryInterface.addColumn('users', 'admin', { type: Sequelize.BOOLEAN, allowNull: false }, { transaction: t });
            await queryInterface.removeColumn('users', 'roleId', { transaction: t });
            await queryInterface.removeColumn('users', 'firstName', { transaction: t });
            await queryInterface.removeColumn('users', 'lastName', { transaction: t });
            await queryInterface.removeColumn('users', 'email', { transaction: t });

            await queryInterface.bulkDelete('roles', null, { transaction: t })
            await queryInterface.bulkInsert('roles', oldRoles, { transaction: t });

        });

    }
}