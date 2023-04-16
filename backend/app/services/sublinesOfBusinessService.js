const SublinesOfBusiness = require('../models').sublinesOfBusiness;
const errorHandler = require('./errorHandler');


exports.getAll = () => SublinesOfBusiness.findAll().catch(errorHandler.notifyErrorDatabase);
exports.getById = id => SublinesOfBusiness.findByPk(id).catch(errorHandler.notifyErrorDatabase);


exports.getSublinesOfBusinessByLinesOfBusinessId = async(lineOfBusinessId) => {
    return await SublinesOfBusiness.findAll({
        attributes: ['id', 'name'],
        where: {
            lineOfBusinessId: lineOfBusinessId
        },
    }).catch(errorHandler.notifyErrorDatabase);
}