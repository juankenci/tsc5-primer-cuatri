const districtsService = require('../services/districtsService');

exports.getAll = (req, res, next) => {
  districtsService
    .getAll()
    .then(districts => res.send(districts))
    .catch(next);
}

exports.getById = (req, res, next) => {
  districtsService
    .getById(req.params.id)
    .then(district => res.send(district))
    .catch(next);
}

exports.getAllByProvinceId = (req, res, next) => {
  districtsService
    .getAllByProvinceId(req.params.id)
    .then( districts => {
      if (districts.length ==0)
      {
        return res.status(204).send();
      } 
      return res.send(districts);
    }  
    )
    .catch(next);
}
