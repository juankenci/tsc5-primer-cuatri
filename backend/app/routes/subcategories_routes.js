const subcategoriesController = require('../controllers/subcategoriesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/subcategories', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las sub-categorias'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Subcategories' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        subcategoriesController.getAll);

    app.get('/api/v2/subcategories/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener una sub-categoria por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de la sub-categoria",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Subcategory' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        subcategoriesController.getById);

    app.get('/api/v2/branches/:branch_id/categories/:category_id/subcategories', (req, res, next) =>
        /*  
            #swagger.description = 'Obtener todas las sub-categorias por id de rama y id de categoria'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["branch_id"] = {
                in: "path",
                description: "Id de la rama",
                required: true,
                type: "number"
            }
        
            #swagger.parameters["category_id"] = {
                in: "path",
                description: "Id de la categoria",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtención exitosa.',
                schema: { 
                    $ref: '#/definitions/Subcategories' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        subcategoriesController.getSubcategoriesCategoryBranch);
}