const countriesService = require('../services/countriesService');

exports.getAll = (req, res, next) => {
  countriesService
    .getAll()
    .then(countries => res.send(countries))
    .catch(next);
}

exports.getById = (req, res, next) => {
  countriesService
    .getById(req.params.id)
    .then(country => res.send(country))
    .catch(next);
}

exports.getAllByContinentId = (req, res, next) => {
  countriesService
    .getAllByContinentId(req.params.id)
    .then(countries => res.send(countries))
    .catch(next);
}

