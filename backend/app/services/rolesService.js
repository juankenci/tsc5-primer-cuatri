const roleModel = require('../models').roles;
const errorHandler = require('./errorHandler');



exports.createRole = (req, res) => {
    const {name,active} = req.body
    if (name != undefined) {
        roleModel.create({
                name: name,
                active: active,
                createdAt: (new Date()),
            })
            .then((result) => {
                console.log(result)
                if (result) {
                    res.status(200).send({ message: 'The role has been created successfully.' });
                } else {
                    res.status(404).send({ text: 'Schema does not exist!' });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating data."
                });
            })
    } else {
        res.status(400).send({ message: 'One or more params are missing' });
    }
}

exports.getAll = () => roleModel.findAll().catch(errorHandler.notifyErrorDatabase);
exports.getById = id =>  roleModel.findByPk(id).catch(errorHandler.notifyErrorDatabase);