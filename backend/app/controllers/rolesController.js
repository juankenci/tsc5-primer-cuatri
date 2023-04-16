const roleService = require('../services/rolesService')

exports.createRole = async(req, res) =>{
    roleService.createRole(req, res)
}

exports.getAll = (req, res, next) => {
    roleService
    .getAll()
    .then(roles => res.send(roles))
    .catch(next);
}

exports.getById = (req, res, next) => {
    roleService
    .getById(req.params.id)
    .then(role => res.send(role))
    .catch(next);
}