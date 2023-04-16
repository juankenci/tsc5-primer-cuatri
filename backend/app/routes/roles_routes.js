const rolesController = require('../controllers/rolesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    //Role
    app.post('/api/v2/roles', (req, res, next) =>
        /*  
            #swagger.description = 'Creación de un role'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["obj"] = {
                in: "body",
                description: "Role",
                required: true,
                schema: { $ref: '#/definitions/CreateRoleReq' }
            }


            #swagger.responses[200] = {
                description: 'Creación exitosa.',
                schema: { 
                    $ref: '#/definitions/CreateRoleResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        auth.isAuthorized,
        rolesController.createRole);

    app.get('/api/v2/roles', (req, res, next) =>
        /*  
            #swagger.description = 'Obtención de todos los roles'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: { 
                       $ref: '#/definitions/GetAllRolesResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        auth.isAuthorized,
        rolesController.getAll);

    app.get('/api/v2/roles/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtención de un role por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: { 
                    $ref: '#/definitions/GetRoleByIdResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        auth.isAuthorized,
        rolesController.getById);
}