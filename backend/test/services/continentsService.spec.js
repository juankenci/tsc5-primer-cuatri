const entitiesService = require('../../app/services/continentsService');

test('get 5 continents', async () => {
    var continents = await entitiesService.getAll();
    expect(continents).toBeDefined();
    expect(continents.length).toEqual(5);
  });

test('get América id = 2', async () => {
    var continents = await entitiesService.getById(2);
    expect(continents).toBeDefined();
    expect(continents.name).toStrictEqual("América");
});
