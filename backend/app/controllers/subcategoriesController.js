const subcategoriesService = require('../services/subcategoriesService');

getAll = (req, res, next) => {
    subcategoriesService
        .getAll(req.params.id)
        .then(subcategories => res.send(subcategories))
        .catch(next);
}

getById = (req, res, next) => {
    subcategoriesService
        .getById(req.params.id)
        .then(subcategory => res.send(subcategory))
        .catch(next);
}

getSubcategoriesCategoryBranch = (req, res, next) => {
    subcategoriesService
        .getSubcategoriesByBranchCategoryId(req.params.branch_id, req.params.category_id)
        .then(subcategories => {
            var result = [];
            if (subcategories) {
                subcategories.forEach(subcategories => {
                    result.push({ 'name': subcategories.name, 'id': subcategories.id });
                });
            }
            res.send(result);
        })
        .catch(next);
}


module.exports = {
    getAll,
    getById,
    getSubcategoriesCategoryBranch
}