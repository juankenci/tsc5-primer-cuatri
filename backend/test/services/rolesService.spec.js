const rolesService = require('../../app/services/rolesService');

test('get rolesService admin', async () => {
    var roles = await rolesService.getAll();
    expect(roles).toBeDefined();
    expect(roles.find(rol => rol.name=="admin")).toBeTruthy()
});
