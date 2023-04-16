const entitiesService = require('../../app/services/entitiesService');

test('get entitiesService equal 0', async () => {
    var entities = await entitiesService.getAll(); 
    expect(entities).toBeDefined();
    expect(entities.length).toEqual(0);

  });


/*test('get by id', async () => {
   var entity = await entitiesService.getById(1)
   expect(entity).toBeDefined();
   expect(entity.id).toEqual(1);
   expect(entity.nombre).toStrictEqual('COMPLETAR CON NOMBRE CUANDO HAYA ENTIDADES CREADAS EN DB');
});*/


test('create and delete', async () => {
    // se comprueba que no existe el que vamos a agregar
    var entity = await entitiesService.getById(499)
    expect(entity).toBeNull()
    
    //se crea categoria nueva
    const entityJson = {
        name: "newEntity",
        oldName: "oldEntity",
        recoveryDate: "10/5/2020",
        goodsAndServices: "bienes servicios",
        startDate: "1/1/1994",
        street: "falsa",
        streetNumber: "123",
        betweenStreet1: "una calle",
        betweenStreet2: "otra calle",
        neighborhood: "pinieiro",
        latitude: -34.660287, 
        longitude: -58.355906,
        continentId:2,
        countryId:54,
        provinceId:5482,
        districtId:5482133,
        localityId:5590,
        branchId:1,
        categoryId: 1,
        subcategoryId: 2,
        legalFormId:1
    }

    const newEntity = await entitiesService.createOne(entityJson);
    
    expect(newEntity).toBeDefined();
    expect(newEntity.name).toStrictEqual('newEntity');
    
    //se accede tambien por id
    var newEntityById = await entitiesService.getById(newEntity.id)
    expect(newEntityById).toBeDefined()
    expect(newEntityById.id).toEqual(newEntity.id);
    expect(newEntityById.name).toStrictEqual('newEntity');

    // se elimina entidad creada
    await entitiesService.deleteById(newEntity.id);
    
    // se comprueba que se borró
    newEntityById = await entitiesService.getById(newEntity.id)
    expect(newEntityById).toBeNull()
  });

  
  test('update', async () => {
    // se comprueba que no existe el que vamos a agregar
    var entity = await entitiesService.getById(499)
    expect(entity).toBeNull()

    //se crea categoria nueva
    const entityJson = {
      name: "newEntity",
      oldName: "oldEntity",
      recoveryDate: "10/5/2020",
      goodsAndServices: "bienes servicios",
      startDate: "1/1/1994",
      street: "falsa",
      streetNumber: "123",
      betweenStreet1: "una calle",
      betweenStreet2: "otra calle",
      neighborhood: "pinieiro",
      latitude: -34.660287, 
      longitude: -58.355906,
      continentId:2,
      countryId:54,
      provinceId:5482,
      districtId:5482133,
      localityId:5590,
      branchId:1,
      categoryId: 1,
      subcategoryId: 2,
      legalFormId:1
    }

    const newEntity = await entitiesService.createOne(entityJson);
    expect(newEntity).toBeDefined();
    expect(newEntity.name).toStrictEqual('newEntity');

    const entityJsonModified = {
      id: newEntity.id,
      name: "newEntityUpdated",
      oldName: "oldEntity",
      recoveryDate: "10/5/2020",
      goodsAndServices: "bienes servicios",
      startDate: "1/1/1994",
      street: "falsa",
      streetNumber: "123",
      betweenStreet1: "una calle",
      betweenStreet2: "otra calle",
      neighborhood: "pinieiro",
      latitude: -34.660287, 
      longitude: -58.355906,
      continentId:2,
      countryId:54,
      provinceId:5482,
      districtId:5482133,
      localityId:5590,
      branchId:1,
      categoryId: 1,
      subcategoryId: 2,
      legalFormId:1
    }

    await entitiesService.update(entityJsonModified);

    var updatedEntityById = await entitiesService.getById(newEntity.id)
    expect(updatedEntityById).toBeDefined()
    expect(updatedEntityById.name).toStrictEqual('newEntityUpdated');

     // se elimina categoria
     await entitiesService.deleteById(newEntity.id);

     // se comprueba que se borró
     newEntityById = await entitiesService.getById(newEntity.id)
     expect(newEntityById).toBeNull()
  });
