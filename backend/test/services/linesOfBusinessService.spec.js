const linesOfBusinessService = require('../../app/services/linesOfBusinessService');

test('get 68 linesOfBusiness', async () => {
    var linesOfBusiness = await linesOfBusinessService.getAll();
    expect(linesOfBusiness).toBeDefined();
    expect(linesOfBusiness.length).toEqual(68); 
});

test('get by id 68 -> Logística y servicios de delivery', async () => {
    var lineOfBusines = await linesOfBusinessService.getById(68)
    expect(lineOfBusines).toBeDefined();
    expect(lineOfBusines.id).toEqual(68);
    expect(lineOfBusines.name).toStrictEqual('Logística y servicios de delivery'); 
});

test('get by id branch', async () => {
  var lineOfBusines = await linesOfBusinessService.getLinesOfBusinessByBranchId(1)
  
  expect(lineOfBusines).toBeDefined();
  
});