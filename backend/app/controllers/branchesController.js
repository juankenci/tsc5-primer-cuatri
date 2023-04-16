const branchService = require('../services/branchesService')


getAll = (req, res, next) => {
    branchService
        .getAll()
        .then(branches => res.send(branches))
        .catch(next);
}

getById = (req, res, next) => {
    branchService
        .getById(req.params.id)
        .then(branch => res.send(branch))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
}