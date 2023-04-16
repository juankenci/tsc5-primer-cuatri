const EntityCreatedByUserResponse = {
    id: 1,
    name: "string",
}


const EntityPublicMapResponse = {
    id: 1,
    name: "string", 
    latitude: "1.0",
    longitude: "1.0",
}

const EntityPublicResponse = {
    ...EntityPublicMapResponse,
    recoveryDate: "2022-11-19T02:01:18.175Z", 
    goodsAndServices: "string",
    street: "string",
    streetNumber: "string",
    betweenStreets: "string",
    neighborhood: "string",
    assistsNumber: 1,
    baseOrganization: "string", 
    website: "string",
    relatedLinks: "string",
    phone: "string",
    email: "string",
    createdAt: "2022-11-19T02:01:18.175Z",
    updatedAt: "2022-11-19T02:01:18.175Z",
    continent: {
        id: 1,
        name: "string"
    },
    country: {
        id: 1,
        name: "string"
    },
    province: {
        id: 1,
        name: "string"
    },
    district: {
        id: 1,
        name: "string"
    },
    locality: {
        id: 1,
        name: "string"
    },
    branch: {
        id: 1,
        name: "string"
    },
    category: {
        id: 1,
        name: "string"
    },
    subcategory: {
        id: 1,
        name: "string"
    },
    linesSublinesOfBusiness: [
        {
            createdAt: "2022-11-19T02:01:18.175Z",
            updatedAt: "2022-11-19T02:01:18.175Z",
            linesOfBusiness: {
                id: 1,
                name: "string"
            },
            sublinesOfBusiness: {
                id: 1,
                name: "string"
            }
        }
    ], 
    imageFiles: [
        {
            file: "base64 string de bytes",
            name: "string"
        }
    ]
}

const EntityPrivateResponse = {
    ...EntityPublicResponse,
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
        id: 1,
        name: "string"
    },
    audioFiles: [
        {
            file: "base64 string de bytes",
            name: "string"
        }
    ],
}

const EntityCreateRequest = {
    name: "Organización de prueba10000",
    recoveryDate: "2022-11-19T02:01:18.175Z",
    goodsAndServices: "Bienes y servicios de prueba",
    startDate: "2022-11-19T02:01:18.175Z",
    street: "Mario Bravo",
    streetNumber: "1234",
    betweenStreets: "entre calle 101 y 3",
    neighborhood: "test barrio1",
    latitude: -34.6685519,
    longitude: -58.4003385,
    continentId: 2,
    countryId: 54,
    provinceId: 5406,
    districtId: 5406035,
    localityId: 978,
    branchId: 2,
    categoryId: 8,
    subcategoryId: 10,
    legalFormId: 3,
    workersNumber: 10,
    womenNumber: 5,
    menNumber: 4,
    otherWorkersNumber: 1,
    paidWorkersNumber: 7,
    volunteerWorkersNumber: 2,
    assistsNumber: 1,
    physicalSpaceSituation: "situacion del espacio fisico",
    propertySituation: "situacion del inmueblke alquilado/propio/etc",
    baseOrganization: "integran alguna organizacion de base",
    subsidy: "subsidio",
    website: "www.organizacion.com",
    relatedLinks: "www.facebook.com/orgaizacion",
    additionalInformation: "informacion adicional",
    joints: "articulaciones",
    referer: "referente",
    cellphone: "1122332211",
    phone: "44442222",
    email: "unemail@mail.com",
    audioFiles: [
        {
            file: "base64 string de bytes",
            name: "string"
        }
    ],
    imageFiles: [
        {
            file: "base64 string de bytes",
            name: "string"
        }
    ],
    linesSublinesOfBusiness: [
        {
            "linesOfBusinessId": 60,
            "sublinesOfBusinessId": 1
        },
    ]
}

const EntityCreatedResponse = {
    id: 1,
    created: "ok"
}

module.exports = {
    EntityCreateRequest,
    EntityCreatedResponse,
    EntitiesCreatedByUserResponse: [ EntityCreatedByUserResponse ],
    EntitiesPublicMapResponse: [ EntityPublicMapResponse ],
    EntityPublicResponse,
    EntityPrivateResponse,
    EntitiesPrivateResponse: [ EntityPrivateResponse ],
}