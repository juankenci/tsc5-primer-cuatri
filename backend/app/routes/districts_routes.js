const districtsController = require('../controllers/districtsController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/provinces/:id/districts', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de distritos por id de provincias'
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
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/DistrictsPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        districtsController.getAllByProvinceId);

    app.get('/api/v2/districts', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todos los distritos'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/DistrictsPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        districtsController.getAll);

    app.get('/api/v2/districts/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de distrito por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de distrito",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/DistrictPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        districtsController.getById);
}