const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');

test('should be true if the promise was resolved', () => {
  expect(leerInput('Ciudad: ')).resolves.toBe({});
});