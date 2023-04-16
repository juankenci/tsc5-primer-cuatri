const entitiesService = require('../../app/services/provincesService');

test('get 25 provinces for Argentina', async () => {
    var provinces = await entitiesService.getAllByCountryId(54);
    expect(provinces).toBeDefined();
    expect(provinces.length).toEqual(25);
});

test('get Santa Fe provinces for id', async () => {
  var province = await entitiesService.getById(5482);
  expect(province).toBeDefined();
  expect(province.name).toStrictEqual("Santa Fe");
});
