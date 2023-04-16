'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'entities',
        'latitud',
        {
          type: Sequelize.DECIMAL(10,8), 
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'entities',
        'longitud',
        {
          type: Sequelize.DECIMAL(11,8), 
          allowNull: false
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('entities', 'latitud'),
      queryInterface.removeColumn('entities', 'longitud')
    ]);
  }
};
