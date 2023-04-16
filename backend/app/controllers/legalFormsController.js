const legalFormService = require('../services/legalFormsService')


getAll = (req, res, next) => {
    legalFormService
        .getAll()
        .then(legalForms => res.send(legalForms))
        .catch(next);
}

getById = (req, res, next) => {
    legalFormService
        .getById(req.params.id)
        .then(legalForm => res.send(legalForm))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
}