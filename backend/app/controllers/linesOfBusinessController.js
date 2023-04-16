const linesOfBusinessService = require('../services/linesOfBusinessService')


getAll = (req, res, next) => {
    linesOfBusinessService
        .getAll()
        .then(linesOfBusiness => res.send(linesOfBusiness))
        .catch(next);
}

getById = (req, res, next) => {
    linesOfBusinessService
        .getById(req.params.id)
        .then(lineOfBusiness => res.send(lineOfBusiness))
        .catch(next);
}

getLinesOfBusinessBranch = (req, res, next) => {
    linesOfBusinessService
        .getLinesOfBusinessByBranchId(req.params.branch_id)
        .then(linesOfBusiness => {
            var result = [];
            if (linesOfBusiness) {
                linesOfBusiness.forEach(lineOfBusiness => {
                    result.push({ 'name': lineOfBusiness.name, 'id': lineOfBusiness.id });
                });
            }
            res.send(result);
        })
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    getLinesOfBusinessBranch,
}