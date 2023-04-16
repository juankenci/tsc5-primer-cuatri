module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async t => {
            //Borra los registros de los usuarios creados, el seed con el usuario de prueba admin generaba problemas al crear el primer usuario
            await queryInterface.bulkDelete('users', null, { transaction: t })
        });
    },

    async down(queryInterface, Sequelize) {

    }
}