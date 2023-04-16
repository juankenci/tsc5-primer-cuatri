// import {fileTypeFromBuffer} from 'file-type';

/* eslint-disable prefer-const */
const entitiesService = require("../services/entitiesService");
const userService = require("../services/userService");
const geoserverSync = require("../utils/geoserverSync");
const _ = require("lodash");
const filesValidate = require("../utils/files");

/**
 * Valida si los datos son validos para una entidad
 */
isValidData = async (data) => {
  if (
    !(
      data.name &&
      data.goodsAndServices &&
      data.startDate &&
      data.street &&
      data.streetNumber &&
      data.betweenStreets &&
      data.neighborhood &&
      data.countryId &&
      data.provinceId &&
      data.districtId &&
      data.localityId &&
      data.branchId &&
      data.categoryId &&
      data.subcategoryId &&
      data.legalFormId &&
      data.linesSublinesOfBusiness &&
      data.latitude &&
      data.longitude
    )
  ) {
    return false;
  }

  // Validate files
  if (data.audioFiles) {
    if (data.audioFiles.length > 3) return false;

    for (const audioFile of data.audioFiles) {
      const isValid = await filesValidate.validateAudio(audioFile.file);
      if (!isValid || !audioFile.name) return false;
    }
  }

  if (data.imageFiles) {
    if (data.imageFiles.length > 3) return false;

    for (const imageFile of data.imageFiles) {
      const isValid = await filesValidate.validateImage(imageFile.file);
      if (!isValid || !imageFile.name) return false;
    }
  }

  return true;
};

createOne = async (req, res, next) => {
  try {
    //TODO: mejorar las validaciones
    let user = await userService.getUserbyToken(req.token);
    if (user && (await isValidData(req.body))) {
      let entity = await entitiesService.createOne(req.body, user.id);
      res.json({ creted: "ok", id: entity.id });
    } else {
      res.status(400).send({ message: "invalid params to create entity" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating data.",
    });
  }
};

geoserver = async (req, res, next) => {
  try {
    let entities = await entitiesService.getDataToShowInMap();
    //TODO: revisar este metodo del geoserver, que no espera el response y devuelve ok aunque el geoserver no este respondiendo
    geoserverSync.send(entities);
    res.json({ ok: true });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating data.",
    });
  }
};

getAll = (req, res, next) => {
  entitiesService
    .getAll()
    .then((entities) => res.send(entities))
    .catch(next);
};

getById = async (req, res, next) => {
  try {
    //recuperar el usuario del token
    let user = await userService.getUserbyToken(req.token);
    if (user) {
      var userEntity = await userService.existEntityByUserId(
        req.params.entityId,
        user.id
      );
      if (userEntity) {
        let entity = await entitiesService.getById(req.params.entityId);
        res.send(entity);
      } else {
        res.status(400).send({
          message: "The current user does not have access to this entity",
        });
      }
    } else {
      res.status(500).send({ message: "Invalid token for user" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating data.",
    });
  }
};

publicGetById = async (req, res, next) => {
  try {
    let entity = await entitiesService.publicGetById(req.params.entityId);
    res.send(entity);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating data.",
    });
  }
};

getEntitiesByUser = async (req, res, next) => {
  try {
    //recuperar el usuario del token
    let user = await userService.getUserbyToken(req.token);
    if (user) {
      var userEntites = await entitiesService.getEntitiesByUserId(user.id);
      var result = [];
      if (userEntites) {
        userEntites.forEach((entity) => {
          result.push({
            name: _.get(entity, "entity.name"),
            id: _.get(entity, "entity.id"),
          });
        });
      }
      res.send(result);
    } else {
      res.status(500).send({ message: "invalid token for user" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating data.",
    });
  }
};

search = (req, res, next) => {
  entitiesService
    .search(req.query)
    .then((points) => res.send(points))
    .catch(next);
};

publicSearch = (req, res, next) => {
  entitiesService
    .publicSearch(req.query)
    .then((points) => res.send(points))
    .catch(next);
};

module.exports = {
  createOne: createOne,
  geoserver: geoserver,
  getAll: getAll,
  getById: getById,
  publicGetById: publicGetById,
  getEntitiesByUser: getEntitiesByUser,
  search: search,
  publicSearch: publicSearch,
};
