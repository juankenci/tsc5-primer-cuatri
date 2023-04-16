const entitiesController = require('../controllers/entitiesController');
const auth = require('../middlewares/auth');
const logger = require('../logger/audit_logger');

module.exports = function(app) {

    app.get('/api/v2/entities/user', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion de entidades creadas por el usuario autenticado'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: {
                    $ref: '#/definitions/EntitiesCreatedByUserResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        entitiesController.getEntitiesByUser);

    app.get('/api/v2/entities/search', (req, res, next) =>
        /*  
            #swagger.description = 'Busqueda privada de entidades'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["id"] = {
                in: "query",
                description: "Id de entidad",
                required: false,
                type: "number"
            }

            #swagger.parameters["continentId"] = {
                in: "query",
                description: "Id de continente",
                required: false,
                type: "number"
            }

            #swagger.parameters["countryId"] = {
                in: "query",
                description: "Id de pais",
                required: false,
                type: "number"
            }

            #swagger.parameters["provinceId"] = {
                in: "query",
                description: "Id de provincia",
                required: false,
                type: "number"
            }

            #swagger.parameters["districtId"] = {
                in: "query",
                description: "Id de distrito",
                required: false,
                type: "number"
            }

            #swagger.parameters["localityId"] = {
                in: "query",
                description: "Id de localidad",
                required: false,
                type: "number"
            }

            #swagger.parameters["branchId"] = {
                in: "query",
                description: "Id de rama",
                required: false,
                type: "number"
            }

            #swagger.parameters["categoryId"] = {
                in: "query",
                description: "Id de categoria",
                required: false,
                type: "number"
            }

            #swagger.parameters["subcategoryId"] = {
                in: "query",
                description: "Id de subcategoria",
                required: false,
                type: "number"
            }

            #swagger.parameters["legalFormId"] = {
                in: "query",
                description: "Id de legalForm",
                required: false,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: { 
                    $ref: '#/definitions/EntitiesPrivateResponse'
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        entitiesController.search);

    app.get('/api/v2/public/entities/search', (req, res, next) =>
        /*  
            #swagger.description = 'Busqueda publica de entidades'
            #swagger.parameters["id"] = {
                in: "query",
                description: "Id de entidad",
                required: false,
                type: "number"
            }

            #swagger.parameters["continentId"] = {
                in: "query",
                description: "Id de continente",
                required: false,
                type: "number"
            }

            #swagger.parameters["countryId"] = {
                in: "query",
                description: "Id de pais",
                required: false,
                type: "number"
            }

            #swagger.parameters["provinceId"] = {
                in: "query",
                description: "Id de provincia",
                required: false,
                type: "number"
            }

            #swagger.parameters["districtId"] = {
                in: "query",
                description: "Id de distrito",
                required: false,
                type: "number"
            }

            #swagger.parameters["localityId"] = {
                in: "query",
                description: "Id de localidad",
                required: false,
                type: "number"
            }

            #swagger.parameters["branchId"] = {
                in: "query",
                description: "Id de rama",
                required: false,
                type: "number"
            }

            #swagger.parameters["categoryId"] = {
                in: "query",
                description: "Id de categoria",
                required: false,
                type: "number"
            }

            #swagger.parameters["subcategoryId"] = {
                in: "query",
                description: "Id de subcategoria",
                required: false,
                type: "number"
            }

            #swagger.parameters["legalFormId"] = {
                in: "query",
                description: "Id de legalForm",
                required: false,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Busqueda exitosa con resultados.',
                schema: { 
                    $ref: '#/definitions/EntitiesPublicMapResponse' 
                }
            }
        */    
        logger.loggerTransactions(req, res, next),
        entitiesController.publicSearch);

    app.get('/api/v2/entities/:entityId', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion privada de entidad por id'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["entityId"] = {
                in: "path",
                description: "Id de entidad",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: { 
                    $ref: '#/definitions/EntityPrivateResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        entitiesController.getById);

    app.get('/api/v2/public/entities/:entityId', (req, res, next) =>
        /*  
            #swagger.description = 'Obtencion publica de entidad'
            #swagger.parameters["entityId"] = {
                in: "path",
                description: "Id de entidad",
                required: true,
                type: "number"
            }

            #swagger.responses[200] = {
                description: 'Obtencion exitosa.',
                schema: { 
                    $ref: '#/definitions/EntityPublicResponse' 
                }
            } 
        */
        logger.loggerTransactions(req, res, next),
        entitiesController.publicGetById);

    app.post('/api/v2/entities', (req, res, next) =>
        /*  
            #swagger.description = 'Creacion de entidades'
            #swagger.security = [{
               "Bearer": []
            }]

            #swagger.parameters["obj"] = {
                in: "body",
                description: "Entidad",
                required: true,
                schema: { 
                    $ref: '#/definitions/EntityCreateRequest' 
                }
            }

            #swagger.responses[200] = {
                description: 'Creacion exitosa.',
                schema: { 
                    $ref: '#/definitions/EntityCreatedResponse' 
                }
            }
        */
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        entitiesController.createOne);

/*     app.post('/api/v2/entities/geoserver', (req, res, next) =>
        logger.loggerTransactions(req, res, next),
        auth.isAuthenticated,
        auth.isAuthorized,
        entitiesController.geoserver); */
}