const branchesController = require('../controllers/branchesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/branches', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todas las ramas'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa con resultados.',
                schema: { 
                    $ref: '#/definitions/BranchesPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        branchesController.getAll);

    app.get('/api/v2/branches/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de rama por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de rama",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/BranchPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        branchesController.getById);
}