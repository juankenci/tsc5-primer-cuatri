const provincesService = require('../services/provincesService');

exports.getAll = (req, res, next) => {
  provincesService
    .getAll()
    .then(provinces => res.send(provinces))
    .catch(next);
}

exports.getById = (req, res, next) => {
  provincesService
    .getById(req.params.id)
    .then(province => res.send(province))
    .catch(next);
}

exports.getAllByCountryId = (req, res, next) => {
  provincesService
    .getAllByCountryId(req.params.id)
    .then(provinces => res.send(provinces))
    .catch(next);
}
