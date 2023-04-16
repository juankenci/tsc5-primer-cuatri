const sublinesOfBusinessService = require('../../app/services/sublinesOfBusinessService');

test('get 5 sublinesOfBusinessService', async () => {
    var sublinesOfBusiness = await sublinesOfBusinessService.getAll();
    expect(sublinesOfBusiness).toBeDefined();
    expect(sublinesOfBusiness.length).toEqual(5); 
});

test('get by id 5 -> Ollas y comedores', async () => {
    var sublinesOfBusines = await sublinesOfBusinessService.getById(5)
    expect(sublinesOfBusines).toBeDefined();
    expect(sublinesOfBusines.id).toEqual(5);
    expect(sublinesOfBusines.name).toStrictEqual('Ollas y comedores'); 
});

test('get by id lineOfBusinessId', async () => {
  var sublinesOfBusines = await sublinesOfBusinessService.getSublinesOfBusinessByLinesOfBusinessId(1)
  expect(sublinesOfBusines).toBeDefined();
});