const usersRoutes = require('./users_routes');
const continentsRoutes = require('./continents_routes');
const countriesRoutes = require('./countries_routes');
const provincesRoutes = require('./provinces_routes');
const districtsRoutes = require('./districts_routes');
const localitiesRoutes = require('./localities_routes');
const entitiesRoutes = require('./entities_routes');
const loginRoutes = require('./login_routes');
const rolesRoutes = require('./roles_routes');
const branchesRoutes = require('./branches_routes');
const linesOfBusiness = require('./linesOfBusiness_routes');
const sublinesOfBusinessRoutes = require('./sublinesOfBusiness_routes');
const categoriesRoutes = require('./categories_routes');
const subcategoriesRoutes = require('./subcategories_routes');
const legalFormsRoutes = require('./legalForms_routes');

const auth = require('../middlewares/auth')
const logger = require('../logger/audit_logger')

const { healthCheck } = require('../controllers/healthCheckController');

var cors = require('cors')

exports.init = app => {
    app.use(cors({
        origin: '*'
    }));

    app.get('/api/v2/health', healthCheck);

    usersRoutes(app);
    continentsRoutes(app);
    countriesRoutes(app);
    provincesRoutes(app);
    districtsRoutes(app);
    localitiesRoutes(app);
    entitiesRoutes(app);
    loginRoutes(app);
    rolesRoutes(app);
    branchesRoutes(app);
    linesOfBusiness(app);
    sublinesOfBusinessRoutes(app);
    categoriesRoutes(app);
    subcategoriesRoutes(app);
    legalFormsRoutes(app);
}