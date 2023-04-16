const categoriesService = require('../services/categoriesService');

getAll = (req, res, next) => {
    categoriesService
        .getAll()
        .then(categories => res.send(categories))
        .catch(next);
}

getById = (req, res, next) => {
    categoriesService
        .getById(req.params.id)
        .then(category => res.send(category))
        .catch(next);
}

getCategoriesBranch = (req, res, next) => {
    categoriesService
        .getCategoriesByBranchId(req.params.branch_id)
        .then(categories => {
            var result = [];
            if (categories) {
                categories.forEach(category => {
                    result.push({ 'name': category.name, 'id': category.id });
                });
            }
            res.send(result);
        })
        .catch(next);
}


module.exports = {
    getAll,
    getById,
    getCategoriesBranch,
}