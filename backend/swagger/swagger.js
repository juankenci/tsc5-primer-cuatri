const swaggerAutogen = require('swagger-autogen');
const Schemas = require('./schemas');

const doc = {
  swagger: "2.0",
  info: {
      version: "1.0.0",
      title: "Mapa de economia popular",
      description: "Documentacion de endpoints, API para consumo de servicios de economia popular."
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],

  definitions: {
    ...Schemas.Branches,
    ...Schemas.Categories,
    ...Schemas.Continents,
    ...Schemas.Countries,
    ...Schemas.Districts,
    ...Schemas.Entities,
    ...Schemas.LegalForms,
    ...Schemas.LinesOfBusiness,
    ...Schemas.Localities,
    ...Schemas.Login,
    ...Schemas.Provinces,
    ...Schemas.Roles,
    ...Schemas.Subcategories,
    ...Schemas.SublinesOfBusiness,
    ...Schemas.Users,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query', 'cookie' or 'body'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'Inserte el token JWT como cabecera Bearer Token'
    }
  }
}

const fs = require('fs');
const outputFile = './swagger-output.json';
const baseFolder = "../app/routes/";
let endpointFiles = [];
const files = fs.readdirSync(baseFolder)
files.forEach(file => {
  endpointFiles.push(baseFolder + file);
});

swaggerAutogen()(outputFile, endpointFiles, doc);