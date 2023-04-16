const subcategoriesService = require('../../app/services/subcategoriesService');


test('get subcategoriesService equal 14', async () => {
    var subcategorie = await subcategoriesService.getAll();
    expect(subcategorie).toBeDefined();
    expect(subcategorie.length).toEqual(14); 
  });

test('get by id 1 - Centro comunitario ', async () => {
    var subcategorie = await subcategoriesService.getById(1)
    expect(subcategorie).toBeDefined();
    expect(subcategorie.id).toEqual(1);
    expect(subcategorie.name).toStrictEqual('Centro comunitario');
  });

test('create and delete', async () => {
    // se comprueba que no existe el que vamos a agregar
    var subcategorie = await subcategoriesService.getById(99)
    expect(subcategorie).toBeNull()

    // se crea categoria nueva
    const subcategorieJson = {
        id: 99,
        name: 'category test'
    }

    const newsubcategorie = await subcategoriesService.createOne(subcategorieJson);
    expect(newsubcategorie).toBeDefined();
    expect(newsubcategorie.id).toEqual(99);
    expect(newsubcategorie.name).toStrictEqual('category test');

    // se accede tambien por id
    var newsubcategorieById = await subcategoriesService.getById(99)
    expect(newsubcategorieById).toBeDefined()
    expect(newsubcategorieById.id).toEqual(99);
    expect(newsubcategorieById.name).toStrictEqual('category test');

    // se elimina categoria
    await subcategoriesService.delete(99);

    // se comprueba que se borró
    newsubcategorieById = await subcategoriesService.getById(99)
    expect(newsubcategorieById).toBeNull()
  });

  
  test('update', async () => {
    var subcategorie = await subcategoriesService.getById(1)
    expect(subcategorie).toBeDefined();
    expect(subcategorie.id).toEqual(1);
    expect(subcategorie.name).toStrictEqual('Centro comunitario');

    var subCategoriaJson = {
      id: 1,
      name: 'Comedor updated'
    }
    await subcategoriesService.update(subCategoriaJson);

    var updatedSubCategoriaById = await subcategoriesService.getById(1)
    expect(updatedSubCategoriaById).toBeDefined()
    expect(updatedSubCategoriaById.id).toEqual(1);
    expect(updatedSubCategoriaById.name).toStrictEqual('Comedor updated');

    subCategoriaJson = {
      id: 1,
      name: 'Centro comunitario'
    }

    await subcategoriesService.update(subCategoriaJson);

    subCategoria = await subcategoriesService.getById(1)
    expect(subCategoria).toBeDefined();
    expect(subCategoria.id).toEqual(1);
    expect(subCategoria.name).toStrictEqual('Centro comunitario');
  });