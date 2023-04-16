'use strict';
const fs = require('fs').promises;


module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( async t => {

      var rowMeta = {
        creadoEn:     { type: Sequelize.DATE, allowNull: false },
        modificadoEn: { type: Sequelize.DATE, allowNull: true },
        eliminadoEn:  { type: Sequelize.DATE, allowNull: true },
        activadoEn:   { type: Sequelize.DATE, allowNull: true },
  
        creadoPorId:      { type: Sequelize.INTEGER, allowNull: false },
        modificadoPorId:  { type: Sequelize.INTEGER, allowNull: true },
        eliminadoPorId:   { type: Sequelize.INTEGER, allowNull: true },
        activadoPorId:    { type: Sequelize.INTEGER, allowNull: true }
      };

      var promesa_EjecutarLineasArchivo = function( nombreArchivo)
      {
        return fs.readFile(nombreArchivo).then( 
          function(sql)
          {
            var promesas = []
            var statements = sql.toString().split(';')
            for (var statement of statements)
                if (statement.trim() != '') promesas.push(queryInterface.sequelize.query(statement,{ transaction: t }))
            return Promise.all(promesas)
            //return promesas;
           })
      };

     
       await queryInterface.createTable('continente', {
        activado:     { type: Sequelize.BOOLEAN, allowNull: false },
        ...rowMeta,
        id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: Sequelize.STRING, allowNull: false }, 
  
      }, { transaction: t });

      
    

      await queryInterface.createTable('pais', {
        activado:     { type: Sequelize.BOOLEAN, allowNull: false },
        ...rowMeta,
  
        id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: Sequelize.STRING, allowNull: false }, 
  
        nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
        codigo:           { type: Sequelize.INTEGER,  allowNull: true },
        codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
        continenteId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'continente', key:'id'} },
  

      }, { transaction: t });
      
    


      await queryInterface.createTable('provincia', {
        activado:     { type: Sequelize.BOOLEAN, allowNull: false },
        ...rowMeta,

        id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: Sequelize.STRING, allowNull: false }, 
  
        nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
        codigo:           { type: Sequelize.INTEGER,  allowNull: true },
        codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
        paisId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'pais', key:'id'} },
      }, { transaction: t });
      
    

      await queryInterface.createTable('dptoPartido', {
        activado:     { type: Sequelize.BOOLEAN, allowNull: false },
        ...rowMeta,
  
        id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: Sequelize.STRING, allowNull: false }, 
  
        nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
        codigo:           { type: Sequelize.INTEGER,  allowNull: true },
        codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
        estado:           { type: Sequelize.INTEGER,  allowNull: true },
        provinciaId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'provincia', key:'id'} },
        
      }, { transaction: t });
      
    

      await queryInterface.createTable('localidad', {
        activado:     { type: Sequelize.BOOLEAN, allowNull: false },
        ...rowMeta,
  
        id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        nombre: { type: Sequelize.STRING, allowNull: false }, 
  
        nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
        codigo:           { type: Sequelize.INTEGER,  allowNull: true },
        codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
        dptoPartidoId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'dptoPartido', key:'id'} },
  
      }, { transaction: t });
      
      await promesa_EjecutarLineasArchivo('migrations/sql/continente.sql');
      await promesa_EjecutarLineasArchivo('migrations/sql/pais.sql');
      await promesa_EjecutarLineasArchivo('migrations/sql/provincia.sql');
      await promesa_EjecutarLineasArchivo('migrations/sql/dptoPartido.sql');
      await promesa_EjecutarLineasArchivo('migrations/sql/localidad.sql');
     

    

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
  
        queryInterface.dropTable('localidad', { transaction: t }),
        queryInterface.dropTable('dptoPartido', { transaction: t }),
        queryInterface.dropTable('provincia', { transaction: t }),
        queryInterface.dropTable('pais', { transaction: t }),
        queryInterface.dropTable('continente', { transaction: t })
  
        //queryInterface.removeColumn('Person', 'favoriteColor', { transaction: t })

  
      ]);
    });
  }
};

/*module.exports = {
  up: async (queryInterface, Sequelize) => {

    var rowMeta = {
      creadoEn:     { type: Sequelize.DATE, allowNull: false },
      modificadoEn: { type: Sequelize.DATE, allowNull: true },
      eliminadoEn:  { type: Sequelize.DATE, allowNull: true },
      activadoEn:   { type: Sequelize.DATE, allowNull: true },

      creadoPorId:      { type: Sequelize.INTEGER, allowNull: false },
      modificadoPorId:  { type: Sequelize.INTEGER, allowNull: true },
      eliminadoPorId:   { type: Sequelize.INTEGER, allowNull: true },
      activadoPorId:    { type: Sequelize.INTEGER, allowNull: true }
    };



    await queryInterface.createTable('continente', {
      activado:     { type: Sequelize.BOOLEAN, allowNull: false },
      ...rowMeta,
      
      id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING, allowNull: false }, 

    }
    
    );

    await queryInterface.createTable('pais', {
      activado:     { type: Sequelize.BOOLEAN, allowNull: false },
      ...rowMeta,

      id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING, allowNull: false }, 

      nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
      codigo:           { type: Sequelize.INTEGER,  allowNull: true },
      codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
      continenteId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'continente', key:'id'} },


    });

    await queryInterface.createTable('provincia', {
      activado:     { type: Sequelize.BOOLEAN, allowNull: false },
      ...rowMeta,

      id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING, allowNull: false }, 

      nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
      codigo:           { type: Sequelize.INTEGER,  allowNull: true },
      codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
      paisId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'pais', key:'id'} },


    });

    await queryInterface.createTable('dptoPartido', {
      activado:     { type: Sequelize.BOOLEAN, allowNull: false },
      ...rowMeta,

      id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING, allowNull: false }, 

      nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
      codigo:           { type: Sequelize.INTEGER,  allowNull: true },
      codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
      estado:           { type: Sequelize.INTEGER,  allowNull: true },
      provinciaId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'provincia', key:'id'} },
      


    });

    await queryInterface.createTable('localidad', {
      activado:     { type: Sequelize.BOOLEAN, allowNull: false },
      ...rowMeta,

      id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING, allowNull: false }, 

      nombreAbreviado:  { type: Sequelize.STRING,   allowNull: false }, 
      codigo:           { type: Sequelize.INTEGER,  allowNull: true },
      codigoEntero:     { type: Sequelize.INTEGER,  allowNull: true },
      dptoPartidoId: { type: Sequelize.INTEGER,  allowNull: false, references: {model:'dptoPartido', key:'id'} },


    });
    
    
    //fs.readFile('D:\tscv\tsc-2022c1-main\backend\migrations\sql\continente.sql',()=>{}).then(sql => Sequelize.query(sql));

    var promesa_EjecutarLineasArchivo = function( nombreArchivo)
    {
      return fs.readFile(nombreArchivo).then( 
        function(sql)
        {
          var promesas = []
          var statements = sql.toString().split(';')
          for (var statement of statements)
              if (statement.trim() != '') promesas.push(queryInterface.sequelize.query(statement))
          return Promise.all(promesas)
          //return promesas;
         })
    };

    

    await promesa_EjecutarLineasArchivo('migrations/sql/continente.sql');
    await promesa_EjecutarLineasArchivo('migrations/sql/pais.sql');
    await promesa_EjecutarLineasArchivo('migrations/sql/provincia.sql');
    await promesa_EjecutarLineasArchivo('migrations/sql/dptoPartido.sql');
    await promesa_EjecutarLineasArchivo('migrations/sql/localidad.sql');

 
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('localidad');
    await queryInterface.dropTable('dptoPartido');
    await queryInterface.dropTable('provincia');
    await queryInterface.dropTable('pais');
    await queryInterface.dropTable('continente');
    
  }
};*/
