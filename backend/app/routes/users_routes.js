const userController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/users/me', (req, res, next) =>
        /*  
            #swagger.description = 'Obtención de información del usuario autenticado'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: { 
                    $ref: '#/definitions/UserMeResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        userController.getUserMe);

    app.put('/api/v2/users/me', (req, res, next) =>
        /*  
            #swagger.description = 'Actualización de información del usuario autenticado'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["obj"] = {
                in: "body",
                description: "Put to User me request",
                required: true,
                schema: { $ref: '#/definitions/UserMePutRequest' }
            }

            #swagger.responses[200] = {
                description: 'Actualización exitosa.',
                schema: { 
                    $ref: '#/definitions/UserMePutResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        userController.updateUserMe);

    app.post('/api/v2/user/resetpw/order', (req, res, next) =>
        /*  
            #swagger.description = 'Generar orden vía mail para resetear la password de un usuario'

            #swagger.parameters["obj"] = {
                in: "body",
                description: "Resquest para generar una order de cambio de password",
                required: true,
                schema: { $ref: '#/definitions/UserResetPasswordOrderRequest' }
            }

            #swagger.responses[200] = {
                description: 'Orden procesada.',
                schema: { 
                    $ref: '#/definitions/UserResetPasswordOrderResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        userController.orderPasswordResetEmail);
    
    app.post('/api/v2/user/resetpw', (req, res, next) =>
        /*  
            #swagger.description = 'Cambio de contraseña mediante token generado por la orden'

            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["obj"] = {
                in: "body",
                description: "Resquest de cambio de password",
                required: true,
                schema: { $ref: '#/definitions/UserResetPasswordRequest' }
            }

            #swagger.responses[200] = {
                description: 'Orden procesada.',
                schema: { 
                    $ref: '#/definitions/UserResetPasswordResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticatedToReset,
        userController.resetPassword);

}