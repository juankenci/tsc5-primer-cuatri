const entitiesService = require('../../app/services/countriesService');

test('get 204 countries in the World', async () => {
    var countries = await entitiesService.getAll();
    expect(countries).toBeDefined();
    expect(countries.length).toEqual(204);
});

test('getById 54 is Argentina ', async () => {
    var countrie = await entitiesService.getById(54);
    expect(countrie).toBeDefined();
    expect(countrie.name).toStrictEqual("Argentina");
});

test('get 40 countries in America', async () => {
  var countries = await entitiesService.getAllByContinentId(2);
  expect(countries).toBeDefined();
  expect(countries.length).toEqual(40);
});