const sublinesOfBusinessController = require('../controllers/sublinesOfBusinessController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/sublinesOfBusiness', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todos los sub-rubros'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/SublinesOfBusinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        sublinesOfBusinessController.getAll);

    app.get('/api/v2/sublinesOfBusiness/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de sub-rubro por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de sub-rubro",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/SublineOfBusinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        sublinesOfBusinessController.getById);

    app.get('/api/v2/lineOfBusiness/:lineOfBusiness_id/sublinesOfBusiness', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de sub-rubros por id de rubro'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["lineOfBusiness_id"] = {
                in: "path",
                description: "Id de rubro",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/SublinesOfBusinessByLineOfSubinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        sublinesOfBusinessController.getSublinesOfBusinessLinesOfBusiness);
}