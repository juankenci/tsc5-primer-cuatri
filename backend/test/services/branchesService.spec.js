const branchesService = require('../../app/services/branchesService');

test('get 8 branches', async () => {
    var branches = await branchesService.getAll();
    expect(branches).toBeDefined();
    expect(branches.length).toEqual(8); 
});

test('get by id 8 -> Transporte, almacenamiento y logística', async () => {
    var branche = await branchesService.getById(8)
    expect(branche).toBeDefined();
    expect(branche.id).toEqual(8);
    expect(branche.name).toStrictEqual('Transporte, almacenamiento y logística'); 
});
