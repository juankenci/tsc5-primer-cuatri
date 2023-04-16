const Entity = require("../models").entities;
const Continent = require("../models").continents;
const Country = require("../models").countries;
const Province = require("../models").provinces;
const District = require("../models").districts;
const Locality = require("../models").localities;
const Branch = require("../models").branches;
const Category = require("../models").categories;
const SubCategory = require("../models").subcategories;
const LegalForms = require("../models").legalForms;
const EntityLinesSublinesOfBusiness = require("../models").entityLinesSublinesOfBusiness;
const LinesOfBusiness = require("../models").linesOfBusiness;
const SublinesOfBusiness = require("../models").sublinesOfBusiness;
const UserEntitiesModel = require("../models").userEntities;
const FilesModel = require("../models").files;

const db = require("../models");
const errorHandler = require("./errorHandler");

getAll = () => Entity.findAll().catch(errorHandler.notifyErrorDatabase);
deleteById = (id) =>
  Entity.destroy({ where: { id: id } }).catch(errorHandler.notifyErrorDatabase);
update = (entity) =>
  Entity.update(entity, { where: { id: entity.id } }).catch(
    errorHandler.notifyErrorDatabase
  );

createOne = async (entityData, userId) => {
  const data = {
    name: entityData.name,
    recoveryDate: entityData.recoveryDate,
    goodsAndServices: entityData.goodsAndServices,
    startDate: entityData.startDate,
    street: entityData.street,
    streetNumber: entityData.streetNumber,
    betweenStreets: entityData.betweenStreets,
    neighborhood: entityData.neighborhood,
    latitude: entityData.latitude,
    longitude: entityData.longitude,
    continentId: entityData.continentId,
    countryId: entityData.countryId,
    provinceId: entityData.provinceId,
    districtId: entityData.districtId,
    localityId: entityData.localityId,
    branchId: entityData.branchId,
    categoryId: entityData.categoryId,
    subcategoryId: entityData.subcategoryId,
    legalFormId: entityData.legalFormId,
    workersNumber: entityData.workersNumber,
    womenNumber: entityData.womenNumber,
    menNumber: entityData.menNumber,
    paidWorkersNumber: entityData.paidWorkersNumber,
    volunteerWorkersNumber: entityData.volunteerWorkersNumber,
    assistsNumber: entityData.assistsNumber,
    physicalSpaceSituation: entityData.physicalSpaceSituation,
    propertySituation: entityData.propertySituation,
    baseOrganization: entityData.baseOrganization,
    subsidy: entityData.subsidy,
    website: entityData.website,
    relatedLinks: entityData.relatedLinks,
    additionalInformation: entityData.additionalInformation,
    joints: entityData.joints,
    referer: entityData.referer,
    cellphone: entityData.cellphone,
    phone: entityData.phone,
    email: entityData.email,
    otherWorkersNumber: entityData.otherWorkersNumber,
  };
  
  const t = await db.sequelize.transaction();

  try {
    const entity = await Entity.create(data, { transaction: t });

    if (entity) {
      const insertAudios = [];
      const insertVideos = [];
      const insertLinesSublines = [];

      entityData.audioFiles &&
        entityData.audioFiles.forEach(({ name, file }) => {
          insertAudios.push(
            FilesModel.create(
              { name, entityId: entity.id, type: "audio", file: file },
              { transaction: t }
            )
          );
        });

      entityData.imageFiles &&
        entityData.imageFiles.forEach(({ name, file }) => {
          insertVideos.push(
            FilesModel.create(
              { name: name, entityId: entity.id, type: "image", file: file },
              { transaction: t }
            )
          );
        });

        entityData.linesSublinesOfBusiness &&
        entityData.linesSublinesOfBusiness.forEach( ({linesOfBusinessId, sublinesOfBusinessId}) => {
          insertLinesSublines.push(EntityLinesSublinesOfBusiness.create({ entityId: entity.id, linesOfBusinessId, sublinesOfBusinessId},  { transaction: t }))
        })

      //asigna la entidad creada al usuario
      await UserEntitiesModel.create(
        { userId: userId, entityId: entity.id },
        { transaction: t }
      );

      await Promise.all(insertAudios);
      await Promise.all(insertVideos);
      await Promise.all(insertLinesSublines);
      await t.commit();
    }

    return entity;
  } catch (error) {
    await t.rollback();
    return errorHandler.notifyErrorDatabase(error);
  }
};

getById = async (id) => {
  let entity = await Entity.findByPk(id, {
    attributes: {
      exclude: [
        "continentId",
        "countryId",
        "provinceId",
        "districtId",
        "localityId",
        "branchId",
        "categoryId",
        "subcategoryId",
        "legalFormId",
      ],
    },
    include: [
      {
        model: Continent,
        attributes: ["name", "id"],
      },
      {
        model: Country,
        attributes: ["name", "id"],
      },
      {
        model: Province,
        attributes: ["name", "id"],
      },
      {
        model: District,
        attributes: ["name", "id"],
      },
      {
        model: Locality,
        attributes: ["name", "id"],
      },
      {
        model: Branch,
        attributes: ["name", "id"],
      },
      {
        model: Category,
        attributes: ["name", "id"],
      },
      {
        model: SubCategory,
        attributes: ["name", "id"],
      },
      {
        model: LegalForms,
        attributes: ["name", "id"],
      },
      {
        model: FilesModel,
        attributes: ['name', 'type', 'file'],
      },
      {
        model: EntityLinesSublinesOfBusiness,
        as: "linesSublinesOfBusiness",
        attributes: {
          exclude: ["id","entityId", "linesOfBusinessId", "sublinesOfBusinessId"]
        },
        include: [
          {
            model: LinesOfBusiness,
            attributes: ["id", "name"]
          },
          {
            model: SublinesOfBusiness,
            attributes: ["id", "name"]
          }
        ]
      }
    ],
  });
  
  //TODO: falta devolver las linesOfBussiness y sublinesOfBussiness
  const  {files, ...rest} = entity.dataValues
 
  const audioFiles = []
  const imageFiles = []

  for (const {file, type, name} of files) {
    if(type==='audio') audioFiles.push({file, name});
    if(type==='image') imageFiles.push({file, name});
  }

  rest.audioFiles = audioFiles;
  rest.imageFiles = imageFiles;
  return rest;
};

publicGetById = async (id) => {
  let entity = await Entity.findByPk(id, {
    attributes: {
      exclude: [
        "legalFormId",
        "startDate",
        "referer",
        "cellphone",
        "workersNumber",
        "womenNumber",
        "menNumber",
        "otherWorkersNumber",
        "paidWorkersNumber",
        "volunteerWorkersNumber",
        "physicalSpaceSituation",
        "propertySituation",
        "subsidy",
        "additionalInformation",
        "joints",
        "continentId",
        "countryId",
        "provinceId",
        "districtId",
        "localityId",
        "branchId",
        "categoryId",
        "subcategoryId",
      ],
    },
    include: [
      {
        model: Continent,
        attributes: ["name", "id"],
      },
      {
        model: Country,
        attributes: ["name", "id"],
      },
      {
        model: Province,
        attributes: ["name", "id"],
      },
      {
        model: District,
        attributes: ["name", "id"],
      },
      {
        model: Locality,
        attributes: ["name", "id"],
      },
      {
        model: Branch,
        attributes: ["name", "id"],
      },
      {
        model: Category,
        attributes: ["name", "id"],
      },
      {
        model: SubCategory,
        attributes: ["name", "id"],
      },
      {
        model: FilesModel,
        attributes: ['name', 'type', 'file'],
      },
      {
        model: EntityLinesSublinesOfBusiness,
        as: "linesSublinesOfBusiness",
        attributes: {
          exclude: ["id","entityId", "linesOfBusinessId", "sublinesOfBusinessId"]
        },
        include: [
          {
            model: LinesOfBusiness,
            attributes: ["id", "name"]
          },
          {
            model: SublinesOfBusiness,
            attributes: ["id", "name"]
          }
        ]
      }
    ]
  });

  const  {files, ...rest} = entity.dataValues
  const imagesFiles = []

  for (const {file, type, name} of files) {
    if(type==='image') imagesFiles.push({file, name});
  }

  rest.imageFiles = imagesFiles;
  return rest;
};

getEntitiesByUserId = async (userId) => {
  let result = await UserEntitiesModel.findAll({
    where: {
      userId: userId,
    },
    attributes: {
      exclude: ["id", "createdAt", "updatedAt", "userId", "entityId"],
    },
    include: [
      {
        model: Entity,
        attributes: ["id", "name"],
      },
    ],
  });
  return result;
};

const getDataToShowInMap = async function() {
  var entidades = await Entity.findAll({
    include: [
      {
        model: Continent,
        attributes: ["name", "id"],
      },
      {
        model: Country,
        attributes: ["name", "id"],
      },
      {
        model: Province,
        attributes: ["name", "id"],
      },
      {
        model: District,
        attributes: ["name", "id"],
      },
      {
        model: Locality,
        attributes: ["name", "id"],
      },
      {
        model: Branch,
        attributes: ["name", "id"],
      },
      {
        model: Category,
        attributes: ["name", "id"],
      },
      {
        model: SubCategory,
        attributes: ["name", "id"],
      },
      {
        model: LegalForms,
        attributes: ["name", "id"],
      },
    ],
  }).catch(errorHandler.notifyErrorDatabase);

  //TODO: falta devolver las linesOfBussiness y sublinesOfBussiness
  return entidades;
};

search = async function(params) {
  var whereObject = {};
  var validParams = [
    "id",
    "continentId",
    "countryId",
    "provinceId",
    "districtId",
    "localityId",
    "branchId",
    "categoryId",
    "subcategoryId",
    "legalFormId",
  ];

  validParams.forEach((value, index) => {
    if (params[value] !== undefined) {
      whereObject[value] = parseInt(params[value]);
    }
  });

  var entidades = await Entity.findAll({
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "continentId",
        "countryId",
        "provinceId",
        "districtId",
        "localityId",
        "branchId",
        "categoryId",
        "subcategoryId",
        "legalFormId",
      ],
    },
    where: whereObject,
    include: [
      {
        model: Continent,
        attributes: ["name", "id"],
      },
      {
        model: Country,
        attributes: ["name", "id"],
      },
      {
        model: Province,
        attributes: ["name", "id"],
      },
      {
        model: District,
        attributes: ["name", "id"],
      },
      {
        model: Locality,
        attributes: ["name", "id"],
      },
      {
        model: Branch,
        attributes: ["name", "id"],
      },
      {
        model: Category,
        attributes: ["name", "id"],
      },
      {
        model: SubCategory,
        attributes: ["name", "id"],
      },
      {
        model: LegalForms,
        attributes: ["name", "id"],
      },
    ],
  }).catch(errorHandler.notifyErrorDatabase);
  return entidades;
};

publicSearch = async function(params) {
  var whereObject = {};
  var validParams = [
    "id",
    "continentId",
    "countryId",
    "provinceId",
    "districtId",
    "localityId",
    "branchId",
    "categoryId",
    "subcategoryId",
    "legalFormId",
  ];

  validParams.forEach((value, index) => {
    if (params[value] !== undefined) {
      whereObject[value] = parseInt(params[value]);
    }
  });

  var entidades = await Entity.findAll({
    attributes: ["id", "name", "latitude", "longitude"],
    where: whereObject
  }).catch(errorHandler.notifyErrorDatabase);
  return entidades;
};


module.exports = {
  getDataToShowInMap: getDataToShowInMap,
  createOne: createOne,
  getAll: getAll,
  getById: getById,
  publicGetById: publicGetById,
  deleteById: deleteById,
  update: update,
  getEntitiesByUserId: getEntitiesByUserId,
  search: search,
  publicSearch: publicSearch
};
