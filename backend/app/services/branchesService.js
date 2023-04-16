const Branch = require('../models').branches;
const errorHandler = require('./errorHandler');


exports.getAll = () => Branch.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id => Branch.findByPk(id).catch(errorHandler.notifyErrorDatabase);