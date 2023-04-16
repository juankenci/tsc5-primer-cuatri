const localitiesService = require('../services/localitiesService');

exports.getAll = (req, res, next) => {
  localitiesService
    .getAll()
    .then(localities => res.send(localities))
    .catch(next);
}

exports.getById = (req, res, next) => {
  localitiesService
    .getById(req.params.id)
    .then(locality => res.send(locality))
    .catch(next);
}


exports.getAllByDistrictId = (req, res, next) => {
  localitiesService
    .getAllByDistrictId(req.params.id)
    .then(localities => res.send(localities))
    .catch(next);
}
