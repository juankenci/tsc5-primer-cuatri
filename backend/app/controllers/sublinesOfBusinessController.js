const sublinesOfBusinessService = require('../services/sublinesOfBusinessService')


getAll = (req, res, next) => {
    sublinesOfBusinessService
        .getAll()
        .then(linesOfBusiness => res.send(linesOfBusiness))
        .catch(next);
}

getById = (req, res, next) => {
    sublinesOfBusinessService
        .getById(req.params.id)
        .then(lineOfBusiness => res.send(lineOfBusiness))
        .catch(next);
}


getSublinesOfBusinessLinesOfBusiness = (req, res, next) => {
    sublinesOfBusinessService
        .getSublinesOfBusinessByLinesOfBusinessId(req.params.lineOfBusiness_id)
        .then(linesOfBusiness => res.send(linesOfBusiness))
        .catch(next);
}


module.exports = {
    getAll,
    getById,
    getSublinesOfBusinessLinesOfBusiness,
}