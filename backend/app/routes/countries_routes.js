const countriesController = require('../controllers/countriesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/continents/:id/countries', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de paises por id de continente'
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
                    $ref: '#/definitions/CountriesPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        countriesController.getAllByContinentId);

    app.get('/api/v2/countries', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de todos los paises'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: {
                    $ref: '#/definitions/CountriesPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        countriesController.getAll);

    app.get('/api/v2/countries/:id', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de pais por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "path",
                description: "Id de pais",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultado.',
                schema: {
                    $ref: '#/definitions/CountryPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        countriesController.getById);
}