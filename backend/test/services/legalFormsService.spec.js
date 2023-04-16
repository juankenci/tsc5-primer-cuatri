const legalFormsService = require('../../app/services/legalFormsService');

test('get 8 legalForms', async () => {
    var legalForms = await legalFormsService.getAll();
    expect(legalForms).toBeDefined();
    expect(legalForms.length).toEqual(8); 
});

test('get by id 8 -> Sin regularizar', async () => {
    var legalForm = await legalFormsService.getById(8)
    expect(legalForm).toBeDefined();
    expect(legalForm.id).toEqual(8);
    expect(legalForm.name).toStrictEqual('Sin regularizar'); 
});
