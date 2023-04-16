'use strict';


module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( async t =>
      {
         await queryInterface.createTable('entityLinesOfBusiness',
        {
          id:               { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          entityId:         { type: Sequelize.INTEGER, allowNull: false, references: {model:'entities', key:'id'} },
          lineOfBusinessId: { type: Sequelize.INTEGER, allowNull: false, references: {model:'linesOfBusiness', key:'id'} },
          optionalText:     { type: Sequelize.STRING,  allowNull: true }
        }, { transaction: t })
        
          await queryInterface.createTable('entitySubLinesOfBusiness',
        {
          id:               { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          entityId:         { type: Sequelize.INTEGER, allowNull: false, references: {model:'entityLinesOfBusiness',  key:'id'} },
          lineOfBusinessId: { type: Sequelize.INTEGER, allowNull: false, references: {model:'sublinesOfBusiness',      key:'id'} },
          optionalText:     { type: Sequelize.STRING,  allowNull: true }
        }, { transaction: t });
        
          
        
        await queryInterface.addColumn('entities', 'continentId', { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'countryId',   { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'provinceId',  { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'districtId',  { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'localityId',  { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });

        await queryInterface.addConstraint('entities', {
          fields: ['continentId'],
          type: 'foreign key',
          name: 'entity_continentId_fkey',
          references: { table: 'continents', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });
        
        await queryInterface.addConstraint('entities', {
          fields: ['countryId'],
          type: 'foreign key',
          name: 'entity_countryId_fkey',
          references: { table: 'countries', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['provinceId'],
          type: 'foreign key',
          name: 'entity_provinceId_fkey',
          references: { table: 'provinces', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['districtId'],
          type: 'foreign key',
          name: 'entity_districtId_fkey',
          references: { table: 'districts', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['localityId'],
          type: 'foreign key',
          name: 'entity_localityId_fkey',
          references: { table: 'localities', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });
      

        await queryInterface.addColumn('entities', 'branchId',      { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'categoryId',    { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'subcategoryId', { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });
        await queryInterface.addColumn('entities', 'legalFormId',   { type: Sequelize.INTEGER, allowNull: false }, { transaction: t });

    
        await queryInterface.addConstraint('entities', {
          fields: ['branchId'],
          type: 'foreign key',
          name: 'entity_branchId_fkey',
          references: { table: 'branches', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['categoryId'],
          type: 'foreign key',
          name: 'entity_categoryId_fkey',
          references: { table: 'categories', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['subcategoryId'],
          type: 'foreign key',
          name: 'entity_subcategoryId_fkey',
          references: { table: 'subcategories', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

        await queryInterface.addConstraint('entities', {
          fields: ['legalFormId'],
          type: 'foreign key',
          name: 'entity_legalFormId_fkey',
          references: { table: 'legalForms', field: 'id' },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
          transaction: t
        });

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t =>
      {
        await queryInterface.removeColumn('entities', 'continentId',  { transaction: t });
        await queryInterface.removeColumn('entities', 'countryId',    { transaction: t });
        await queryInterface.removeColumn('entities', 'provinceId',   { transaction: t });
        await queryInterface.removeColumn('entities', 'districtId',   { transaction: t });
        await queryInterface.removeColumn('entities', 'localityId',   { transaction: t });

        await queryInterface.removeColumn('entities', 'branchId',       { transaction: t });
        await queryInterface.removeColumn('entities', 'categoryId',     { transaction: t });
        await queryInterface.removeColumn('entities', 'subcategoryId',  { transaction: t });
        await queryInterface.removeColumn('entities', 'legalFormId',    { transaction: t });
        

        await queryInterface.dropTable('entitySubLinesOfBusiness', { transaction: t });
        await queryInterface.dropTable('entityLinesOfBusiness', { transaction: t });
      });
  }
};
