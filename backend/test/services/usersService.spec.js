jest.mock('../../app/services/userService');
const userService = require('../../app/services/userService');


const mockRequestValido = {
  body: {
    "user": "admin",
    "pass": "admin"
  },
}

const mockRequestInvalido = {
  body: {
    "user": "any",
    "pass": "any"
  },
}

const mockResponse = {
  status: '',
  json: '',
  send: function(response){
    this.json = response;
  }
}

test('login fallido', async () => {
  await userService.login(mockRequestInvalido,mockResponse);
  expect(mockResponse.json.error).toBeDefined();
  expect(mockResponse.json).toStrictEqual({"error": "Credentials not valid"});
});


test('login exitoso', async () => {
  await userService.login(mockRequestValido,mockResponse);
  expect(mockResponse.json.token).toBeDefined();
  expect(mockResponse.json.expire).toBeDefined();;
});