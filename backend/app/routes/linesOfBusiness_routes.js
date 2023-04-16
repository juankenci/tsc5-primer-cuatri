const linesOfBusinessController = require('../controllers/linesOfBusinessController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/linesOfBusiness', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todos los rubros'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/LinesOfBusinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        linesOfBusinessController.getAll);

    app.get('/api/v2/linesOfBusiness/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de rubro por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de rubro",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/LineOfBusinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        linesOfBusinessController.getById);

    app.get('/api/v2/branches/:branch_id/linesOfBusiness', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de rubros por id de rama'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["branch_id"] = {
                in: "path",
                description: "Id de forma rama",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/LinesOfBusinessPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        linesOfBusinessController.getLinesOfBusinessBranch);
}