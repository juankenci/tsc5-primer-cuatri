const LegalForm = require('../models').legalForms;
const errorHandler = require('./errorHandler');


exports.getAll = () => LegalForm.findAll().catch(errorHandler.notifyErrorDatabase);
exports.getById = id => LegalForm.findByPk(id).catch(errorHandler.notifyErrorDatabase);