'use strict';
var SequelizeData = require('sequelize');

const rowMeta = 
{
  creadoEn:     { type: SequelizeData.DATE, allowNull: false, defaultValue: SequelizeData.NOW},
  modificadoEn: { type: SequelizeData.DATE, allowNull: true,  defaultValue: null },
  eliminadoEn:  { type: SequelizeData.DATE, allowNull: true,  defaultValue: null },
  activadoEn:   { type: SequelizeData.DATE, allowNull: true,  defaultValue: null },

  creadoPorId:      { type: SequelizeData.INTEGER, allowNull: false, defaultValue: -1 },
  modificadoPorId:  { type: SequelizeData.INTEGER, allowNull: true, defaultValue: null },
  eliminadoPorId:   { type: SequelizeData.INTEGER, allowNull: true, defaultValue: null },
  activadoPorId:    { type: SequelizeData.INTEGER, allowNull: true, defaultValue: null }
};

const columnsDataTypes =
{
  ...rowMeta,
  codigo:       { type: SequelizeData.INTEGER,  allowNull: true, defaultValue: null },
  codigoEntero: { type: SequelizeData.INTEGER,  allowNull: true, defaultValue: null },
  estado:       { type: SequelizeData.INTEGER,  allowNull: true, defaultValue: null },
  
  //Agregar los necesarios. No tomar datos del modelo
  // porque estos no necesariamente estan sincronizados con esta versión.
};

const rowMetaTranslation = 
[
  {nameBefore:'activado',     nameAfter: 'active'},
  {nameBefore:'creadoEn',     nameAfter: 'createdAt'},
  {nameBefore:'modificadoEn', nameAfter: 'updatedAt'},
];

const rowMetaDeletion = 
[
  'eliminadoEn',
  'activadoEn',
  'creadoPorId',
  'modificadoPorId',
  'eliminadoPorId',
  'activadoPorId',
];

const tablesToModify = 
[
  
  {
    originalTableName:  'localidad',
    newTableName:       'localities',
    renameColumns:
    [
      ...rowMetaTranslation,
      {nameBefore:'nombre',           nameAfter: 'name'},
      {nameBefore:'nombreAbreviado',  nameAfter: 'abbreviatedName'},
      {nameBefore:'dptoPartidoId',    nameAfter: 'districtId'},
      
    ],

    deleteColumns:
    [
      ...rowMetaDeletion,
      'codigo',
      'codigoEntero'
      
    ]
  },

  //dptoPartido
  {
    originalTableName:  'dptoPartido',
    newTableName:       'districts',
    renameColumns:
    [
      ...rowMetaTranslation,
      {nameBefore:'nombre',           nameAfter: 'name'},
      {nameBefore:'nombreAbreviado',  nameAfter: 'abbreviatedName'},
      {nameBefore:'provinciaId',      nameAfter: 'provinceId'},
      
    ],

    deleteColumns:
    [
      ...rowMetaDeletion,
      'codigo',
      'codigoEntero',
      'estado'
      
    ]
  },

   //provincia
   {
    originalTableName:  'provincia',
    newTableName:       'provinces',
    renameColumns:
    [
      ...rowMetaTranslation,
      {nameBefore:'nombre',           nameAfter: 'name'},
      {nameBefore:'nombreAbreviado',  nameAfter: 'abbreviatedName'},
      {nameBefore:'paisId',           nameAfter: 'countryId'},
      
    ],

    deleteColumns:
    [
      ...rowMetaDeletion,
      'codigo',
      'codigoEntero'      
    ]
  },

   //pais
   {
    originalTableName:  'pais',
    newTableName:       'countries',
    renameColumns:
    [
      ...rowMetaTranslation,
      {nameBefore:'nombre',           nameAfter: 'name'},
      {nameBefore:'nombreAbreviado',  nameAfter: 'abbreviatedName'},
      {nameBefore:'continenteId',     nameAfter: 'continentId'},
      
    ],

    deleteColumns:
    [
      ...rowMetaDeletion,
      'codigo',
      'codigoEntero'      
    ]
  },

  //continente
  {
    originalTableName:  'continente',
    newTableName:       'continents',
    renameColumns:
    [
      ...rowMetaTranslation,
      {nameBefore:'nombre',           nameAfter: 'name'}
    ],

    deleteColumns:rowMetaDeletion
  },


];

module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( async t =>
      {
        var upPromises = [];
        tablesToModify.forEach((tabla)=>
        {
          if(tabla.hasOwnProperty('renameColumns'))
          {
            tabla.renameColumns.forEach((columna) =>
            {
              upPromises.push(queryInterface.renameColumn(tabla.originalTableName, columna.nameBefore, columna.nameAfter, { transaction: t }));
            });            
          }

          if(tabla.hasOwnProperty('deleteColumns'))
          {
            tabla.deleteColumns.forEach((nombreColumna) =>
            {
              upPromises.push(queryInterface.removeColumn(tabla.originalTableName, nombreColumna, { transaction: t }));
            });            
          }

          

        });
      
        var completeUpPromises = Promise.all(upPromises).then(()=>
        {
          var renameTablesPromises = [];
          tablesToModify.forEach((tabla)=>
          {
            if(tabla.hasOwnProperty('newTableName'))
            {
              renameTablesPromises.push(queryInterface.renameTable(tabla.originalTableName, tabla.newTableName, { transaction: t }));
            }
          });
          return Promise.all(renameTablesPromises);

          
        });

        return completeUpPromises;

    

    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t =>
      {
        var downPromises = [];

        tablesToModify.forEach((tabla)=>
        {
          var tableName = ((tabla.hasOwnProperty('newTableName'))?tabla.newTableName:tabla.originalTableName);

          if(tabla.hasOwnProperty('deleteColumns'))
          {
            tabla.deleteColumns.forEach((nombreColumna) =>
            {
              downPromises.push(queryInterface.addColumn(tableName, nombreColumna, columnsDataTypes[nombreColumna], { transaction: t }));
            });            
          }

          if(tabla.hasOwnProperty('renameColumns'))
          {
            tabla.renameColumns.forEach((columna) =>
            {
              downPromises.push(queryInterface.renameColumn(tableName, columna.nameAfter, columna.nameBefore,  { transaction: t }));
            });            
          }
        
        });
      
        
        var completeDownPromises = Promise.all(downPromises).then(()=>
        {
          var renameTablesPromises = [];
          tablesToModify.forEach((tabla)=>
          {
            if(tabla.hasOwnProperty('newTableName'))
            {
              renameTablesPromises.push(queryInterface.renameTable(tabla.newTableName, tabla.originalTableName, { transaction: t }));
            }
          });

          return Promise.all(renameTablesPromises);

          
        });

        return completeDownPromises;


    });
  }
};
