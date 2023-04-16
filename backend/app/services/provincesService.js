const Provinces = require('../models').provinces;
const errorHandler = require('./errorHandler');


exports.getAll = () => Provinces.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  Provinces.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.getAllByCountryId = id => Provinces.findAll({where: {countryId:id}, order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);

