const continentsController = require('../controllers/continentsController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/continents', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todos los continentes'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/ContinentsPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        continentsController.getAll);

    app.get('/api/v2/continents/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de continente por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de continente",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/ContinentPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        continentsController.getById);
}