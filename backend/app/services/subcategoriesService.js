const Subcategory = require('../models').subcategories;
const Category = require('../models').categories;
const Branch = require('../models').branches;
const errorHandler = require('./errorHandler');


exports.getAll = () => Subcategory.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = (id) => Subcategory.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.createOne = categoryData => Subcategory.create(categoryData).catch(errorHandler.notifyErrorDatabase);
exports.delete = id => Subcategory.destroy({ where: { id: id } }).catch(errorHandler.notifyErrorDatabase);
exports.update = subcategory => Subcategory.update(subcategory, { where: { id: subcategory.id } }).catch(errorHandler.notifyErrorDatabase);

exports.getSubcategoriesByBranchCategoryId = async(branchId, categoryId) => {
    return await Subcategory.findAll({
        attributes: ['id', 'name'],
        include: [{
                model: Category,
                as: 'categories',
                where: {
                    id: categoryId
                },
            },
            {
                model: Branch,
                as: 'branches',
                where: {
                    id: branchId
                },
            }
        ],
        order: [['name', 'ASC']]
    }).catch(errorHandler.notifyErrorDatabase);
}