const entitiesService = require('../../app/services/localitiesService');

test('get districtID for VERA', async () => {
    var localities = await entitiesService.getAllByDistrictId(5482133); 
    expect(localities.find(loc => loc.name=="VERA")).toBeTruthy();
});
