const Category = require('../models').categories;
const Branch = require('../models').branches;
const errorHandler = require('./errorHandler');

exports.getAll = () => Category.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = (id) => Category.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.create = (category) => Category.create(category).catch(errorHandler.notifyErrorDatabase);
exports.delete = (id) => Category.destroy({ where: { id: id } }).catch(errorHandler.notifyErrorDatabase);
exports.update = (category) => Category.update(category, { where: { id: category.id } }).catch(errorHandler.notifyErrorDatabase);

exports.getCategoriesByBranchId = async(branchId) => {
    return await Category.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: Branch,
            as: 'branches',
            where: {
                id: branchId
            },
        }],
    }).catch(errorHandler.notifyErrorDatabase);
}