const localitiesController = require('../controllers/localitiesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/districts/:id/localities', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las localidades de un districto por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "query",
                description: "Id de districto",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Localities' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        localitiesController.getAllByDistrictId);

    app.get('/api/v2/localities', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las localidades'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Localities' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        localitiesController.getAll);

    app.get('/api/v2/localities/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener una localidad por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de localidad",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Locality' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        localitiesController.getById);
}