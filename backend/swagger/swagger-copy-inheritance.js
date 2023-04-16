const swaggerAutogen = require('swagger-autogen');

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
    ContinentMinimal: {
      id: 1,
      name: "string"
    },
    CountryMinimal: {
      id: 1,
      name: "string"
    },
    ProvinceMinimal: {
      id: 1,
      name: "string"
    },
    DistrictMinimal: {
      id: 1,
      name: "string"
    },
    LocalityMinimal: {
      id: 1,
      name: "string"
    },
    BranchMinimal: {
      id: 1,
      name: "string"
    },
    CategoryMinimal: {
      id: 1,
      name: "string"
    },
    SubcategoryMinimal: {
      id: 1,
      name: "string"
    },
    LinesOfBusinessMinimal: {
      id: 1,
      name: "string"
    },
    SublinesOfBusinessMinimal: {
      id: 1,
      name: "string"
    },
    ImageFiles: {
      file: "string",
      name: "string"
    },
    EntityPublic: {
      id: 1,
      name: "string", 
      recoveryDate: "2022-11-19T02:01:18.175Z", 
      goodsAndServices: "string",
      street: "string",
      streetNumber: "string",
      betweenStreets: "string",
      neighborhood: "string",
      latitude: "1.0",
      longitude: "1.0",
      assistsNumber: 1,
      baseOrganization: "string", 
      website: "string",
      relatedLinks: "string",
      phone: "string",
      email: "string",
      createdAt: "2022-11-19T02:01:18.175Z",
      updatedAt: "2022-11-19T02:01:18.175Z",
      continent: {
        $ref: "#/definitions/ContinentMinimal"
      },
      country: {
        $ref: "#/definitions/CountryMinimal"
      },
      province: {
        $ref: "#/definitions/ProvinceMinimal"
      },
      district: {
        $ref: "#/definitions/DistrictMinimal"
      },
      locality: {
        $ref: "#/definitions/LocalityMinimal"
      },
      branch: {
        $ref: "#/definitions/BranchMinimal"
      },
      category: {
        $ref: "#/definitions/CategoryMinimal"
      },
      subcategory: {
        $ref: "#/definitions/SubcategoryMinimal"
      },
      linesSublinesOfBusiness: [
        {
          createdAt: "2022-11-19T02:01:18.175Z",
          updatedAt: "2022-11-19T02:01:18.175Z",
          linesOfBusiness: {
            $ref: "#/definitions/LinesOfBusinessMinimal"
          },
          sublinesOfBusiness: {
            $ref: "#/definitions/SublinesOfBusinessMinimal"
          }
        }
      ], 
      imageFiles: [
        {
          $ref: "#/definitions/ImageFiles"
        }
      ]
    },
    LegalFormMinimal: {
      id: 1,
      name: "string"
    },
    AudioFiles: {
      file: "string",
      name: "string"
    },
/*     Entity: {
      allOf: [
        {
          $ref: "#/definitions/ImageFiles"
        },
        {
          properties: {
            startDate: "2022-11-19T02:01:18.175Z",
            workersNumber: 1,
            womenNumber: 1,
            menNumber: 1,
            paidWorkersNumber: 1,
            volunteerWorkersNumber: 1,
            physicalSpaceSituation: 1,
            propertySituation: "string",
            subsidy: "string",
            additionalInformation: "string",
            referer: "string",
            cellphone: "string",
            otherWorkersNumber: 1,
            joints: "string",
            legalForm: {
              $ref: "#/definitions/LegalFormMinimal"
            },
            audioFiles: [
              {
                $ref: "#/definitions/AudioFiles"
              }
            ],
          }
        }
      ]
    } */
  },
  '@definitions': {
    Entity: {
      type: "object",
      allOf: [
        {
          $ref: "#/definitions/EntityPublic"
        },
        {
          properties: {
            startDate: {
              type: "string",
              example: "2022-11-19T02:01:18.175Z",
            },
            workersNumber: {
              type: "number",
              example: 1,
            },
            womenNumber: {
              type: "number",
              example: 1,
            },
            menNumber: {
              type: "number",
              example: 1,
            },
            paidWorkersNumber: {
              type: "number",
              example: 1,
            },
            volunteerWorkersNumber: {
              type: "number",
              example: 1,
            },
            physicalSpaceSituation: {
              type: "string",
              example: "string",
            },
            propertySituation: {
              type: "string",
              example: "string",
            },
            subsidy: {
              type: "string",
              example: "string",
            },
            additionalInformation: {
              type: "string",
              example: "string",
            },
            referer: {
              type: "string",
              example: "string",
            },
            cellphone: {
              type: "string",
              example: "1122334455",
            },
            otherWorkersNumber: {
              type: "number",
              example: 1,
            },
            joints: {
              type: "string",
              example: "string",
            },
            legalForm: {
              $ref: "#/definitions/LegalFormMinimal"
            },
            audioFiles: {
              type: "array",
              items: {
                $ref: "#/definitions/AudioFiles"
              }
            },
          }
        }
      ]
    }
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header', // can be 'header', 'query' or 'cookie'
      name: 'Authorization', // name of the header, query parameter or cookie
      description: 'Inserte el token JWT como cabecera Bearer Token'
    }
  }
}

const fs = require('fs');
const outputFile = './swagger-output.json';
const baseFolder = "./app/routes/";
let endpointFiles = [];
const files = fs.readdirSync(baseFolder)
files.forEach(file => {
  endpointFiles.push(baseFolder + file);
});

swaggerAutogen()(outputFile, endpointFiles, doc);