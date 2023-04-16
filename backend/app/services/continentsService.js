const Continents = require('../models').continents;
const errorHandler = require('./errorHandler');


exports.getAll = () => Continents.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  Continents.findByPk(id).catch(errorHandler.notifyErrorDatabase);

