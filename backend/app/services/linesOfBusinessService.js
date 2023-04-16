const LinesOfBusiness = require('../models').linesOfBusiness;
const Branch = require('../models').branches;
const errorHandler = require('./errorHandler');


exports.getAll = () => LinesOfBusiness.findAll().catch(errorHandler.notifyErrorDatabase);
exports.getById = id => LinesOfBusiness.findByPk(id).catch(errorHandler.notifyErrorDatabase);

exports.getLinesOfBusinessByBranchId = async(branchId) => {
    return await LinesOfBusiness.findAll({
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