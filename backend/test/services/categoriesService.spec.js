const categoriesService = require('../../app/services/categoriesService');

test('get 9 categories', async () => {
    var categoria = await categoriesService.getAll();
    expect(categoria).toBeDefined();
    expect(categoria.length).toEqual(9); 
  });

test('get by id 1 - Agricultura Familiar rural o periurbana', async () => {
    var Categoria = await categoriesService.getById(1)
    expect(Categoria).toBeDefined();
    expect(Categoria.id).toEqual(1);
    expect(Categoria.name).toStrictEqual('Agricultura Familiar rural o periurbana'); 
  });


test('create and delete', async () => {
    //se comprueba que no existe el que vamos a agregar
    var Categoria = await categoriesService.getById(30)
    expect(Categoria).toBeNull()

    // se crea categoria nueva
    const newCategory = await categoriesService.create({id:30,name: 'Categoria test'});
    expect(newCategory).toBeDefined();
    expect(newCategory.id).toEqual(30);
    expect(newCategory.name).toStrictEqual('Categoria test');

    // se accede tambien por id
    var CategoriaById = await categoriesService.getById(newCategory.id)
    expect(CategoriaById).toBeDefined()
    expect(CategoriaById.id).toEqual(30);
    expect(CategoriaById.name).toStrictEqual('Categoria test');

    // se elimina categoria
    await categoriesService.delete(newCategory.id);

    // se comprueba que se borró
    CategoriaById = await categoriesService.getById(newCategory.id)
    expect(CategoriaById).toBeNull()
  });


  test('update', async () => {
    var Categoria = await categoriesService.getById(1)
    expect(Categoria).toBeDefined();
    expect(Categoria.id).toEqual(1);
    expect(Categoria.name).toStrictEqual('Agricultura Familiar rural o periurbana');

    var categoriaJson = {
      id: 1,
      name: 'Categoria updated'
      
    }
    await categoriesService.update(categoriaJson);

    var updatedCategoriaById = await categoriesService.getById(1)
    expect(updatedCategoriaById).toBeDefined()
    expect(updatedCategoriaById.id).toEqual(1);
    expect(updatedCategoriaById.name).toStrictEqual('Categoria updated');

    categoriaJson = {
      id: 1,
      name: 'Agricultura Familiar rural o periurbana'
    }

    await categoriesService.update(categoriaJson);

    Categoria = await categoriesService.getById(1)
    expect(Categoria).toBeDefined();
    expect(Categoria.id).toEqual(1);
    expect(Categoria.name).toStrictEqual('Agricultura Familiar rural o periurbana');
  
  });