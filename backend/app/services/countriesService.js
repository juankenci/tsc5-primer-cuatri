const Countries = require('../models').countries;
const errorHandler = require('./errorHandler');


exports.getAll = () => Countries.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  Countries.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.getAllByContinentId = id => Countries.findAll({where: {continentId:id}}).catch(errorHandler.notifyErrorDatabase);

