const categoriesController = require('../controllers/categoriesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/categories', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todas las categorias'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/CategoriesPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        categoriesController.getAll);

    app.get('/api/v2/categories/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de categoria por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de categoria",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/CategoryPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        categoriesController.getById);

    app.get('/api/v2/branches/:branch_id/categories', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de categorias por id de rama'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["branch_id"] = {
                in: "path",
                description: "Id de rama",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/CategoriesByBranchPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        categoriesController.getCategoriesBranch);
}