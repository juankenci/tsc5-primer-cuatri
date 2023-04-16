
jest.mock('../../app/services/vaultService');
const vaultService = require('../../app/services/vaultService');

test('Usuario valido', async () => {
  var response = await vaultService.verifyCredentials('admin','admin');
  expect(response).toBe(true);
});


test('Usuario invalido', async () => {
    var response = await vaultService.verifyCredentials('noExiste','noExiste');
    expect(response).toBe(false);
  });