const continentsService = require('../services/continentsService');

exports.getAll = (req, res, next) => {
  continentsService
    .getAll()
    .then(continents => res.send(continents))
    .catch(next);
}

exports.getById = (req, res, next) => {
  continentsService
    .getById(req.params.id)
    .then(continent => res.send(continent))
    .catch(next);
}
