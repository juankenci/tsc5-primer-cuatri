const entitiesService = require('../../app/services/districtsService');

test('get Vera districts for Santa Fe', async () => {
    var districts = await entitiesService.getById(5482133);
    expect(districts).toBeDefined();
    expect(districts.name).toStrictEqual("Vera");
});

test('get 21 districts for Santa Fe', async () => {
  var districts = await entitiesService.getAllByProvinceId(5482);
  expect(districts).toBeDefined();
  expect(districts.length).toEqual(21);
});