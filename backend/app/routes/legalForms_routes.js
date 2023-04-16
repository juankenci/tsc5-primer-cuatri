const legalFormsController = require('../controllers/legalFormsController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/legalForms', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todas las formas juridicas'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/LegalFormsPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        legalFormsController.getAll);

    app.get('/api/v2/legalForms/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de forma juridica por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de forma juridica",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/LegalFormPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        legalFormsController.getById);
}