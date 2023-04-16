const Districts = require('../models').districts;
const errorHandler = require('./errorHandler');


exports.getAll = () => Districts.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  Districts.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.getAllByProvinceId = id => Districts.findAll({where: {provinceId:id}}).catch(errorHandler.notifyErrorDatabase);
