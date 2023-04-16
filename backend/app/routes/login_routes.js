const userController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    //Signup
    app.post('/api/v2/signup', (req, res, next) =>
        /*  
            #swagger.description = 'Endpoint de registro de usuario'
            
            #swagger.parameters["obj"] = {
                in: "body",
                description: "Cuerpo de registro de usuario",
                required: true,
                schema: { $ref: '#/definitions/SignupRequest' }
            }

            #swagger.responses[200] = {
                description: 'Registro de usuario exitoso.',
                schema: {
                    $ref: '#/definitions/SignupResponse'
                }
            }

            #swagger.responses[400] = {
                description: 'Registro de usuario fallido por dato incorrecto o usuario ya existente.',
                schema: {
                    $ref: '#/definitions/SignupResponse'
                }
            }

            #swagger.responses[500] = {
                description: 'Registro de usuario fallido por error desconocido.',
                schema: {
                    $ref: '#/definitions/SignupResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        userController.signupService);

    //Login users
    app.post('/api/v2/login', (req, res, next) =>
        /*  
            #swagger.description = 'Endpoint de inicio de sesion de usuario'
            
            #swagger.parameters["obj"] = {
                in: "body",
                description: "Cuerpo de inicio de sesion de usuario",
                required: true,
                schema: { $ref: '#/definitions/LoginRequest' }
            }

            #swagger.responses[200] = {
                description: 'Inicio de sesion de usuario exitoso.',
                schema: {
                    $ref: '#/definitions/LoginSuccessfulResponse'
                }
            }

            #swagger.responses[401] = {
                description: 'Inicio de sesion de usuario fallido.',
                schema: {
                    $ref: '#/definitions/LoginFailedResponse'
                }
            }

        */
        logger.loggerTransactions(req, res, next),
        userController.loginService);
}