const Localities = require('../models').localities;
const errorHandler = require('./errorHandler');


exports.getAll = () => Localities.findAll({order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  Localities.findByPk(id).catch(errorHandler.notifyErrorDatabase);
exports.getAllByDistrictId = id => Localities.findAll({where: {districtId:id},order: [['name', 'ASC']]}).catch(errorHandler.notifyErrorDatabase);

