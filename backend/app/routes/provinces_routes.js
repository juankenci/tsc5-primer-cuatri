const provincesController = require('../controllers/provincesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/countries/:id/provinces', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las provincias de un pais por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de pais",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Provinces' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        provincesController.getAllByCountryId);

    app.get('/api/v2/provinces', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las provincias'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Provinces' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        provincesController.getAll);

    app.get('/api/v2/provinces/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener una provincia por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de provincia",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Province' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        provincesController.getById);
}