const jwt = require('jsonwebtoken');
const crypto = require('../utils/CryptoJS')
const userModel = require('../models').users;
const userEntitiesModel = require('../models').userEntities;
const vaultService = require('./vaultService');
const jwt_decode = require('jwt-decode');
const { Op } = require("sequelize");
const Roles = require('../models').roles;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME;
const TOKEN_RESET_PASSWORD_EXPIRATION_TIME = process.env.TOKEN_RESET_PASSWORD_EXPIRATION_TIME; 
const URI_RESET_PASSWORD = process.env.URI_RESET_PASSWORD;
const emailService = require('../services/emailService');

login = (data) => {
    return new Promise(async(resolve, reject) => {
        const { user, pass } = data;
        if (await vaultService.verifyCredentials(user, pass)) {
            try {
                const [{dataValues }] = await vaultService.getUserFromDB2(user);
                console.log(dataValues);    
                const {id, email} = dataValues
                const token = jwt.sign({ user, uid: id, email }, vaultService.getPrivateKey(), { expiresIn: TOKEN_EXPIRATION_TIME });
                resolve({ token, expire: TOKEN_EXPIRATION_TIME });    
            } catch (e){
                reject({ error: "reject"});
            }
        } else {
            reject({ error: 'Credentials not valid' })
        }
    })

}

/**
 * Busca un usuario por el campo user
 * @param {String} user 
 * @returns Si existe devuelve el usuario y el id. En caso contrario null
 */
getByUser = async(user) => {
    let result = await userModel.findOne({
        where: { user: user },
        attributes: {
            exclude: ['pass', 'roleId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: Roles,
            attributes: ['id', 'name'],
        }]
    });
    return result;
}

/**
 * Busca un usuario por el campo emai
 * @param {String} email
 * @returns Si existe devuelve el usuario y el id. En caso contrario null
 */
 getByEmail = async(email) => {
    let result = await userModel.findOne({
        where: { email, email },
        attributes: {
            exclude: ['pass', 'roleId', 'createdAt', 'updatedAt']
        },
        include: [{
            model: Roles,
            attributes: ['id', 'name'],
        }]
    });
    return result;
}

/**
 * Busca un usuario por ID
 * @param {String} user 
 * @returns Si existe devuelve el usuario. En caso contrario null
 */
getUserById = async(userId) => {
    let result = await userModel.findOne({
        where: { id: userId },
    });
    return result;
}

getUserMe = (token) => {
    return new Promise(async(resolve, reject) => {

        try {
            const jwt = await jwt_decode(token)
            let result = await getByUser(jwt.user);
            if (result) {
                resolve(result);
            } else {
                reject({ message: "invalid data" });
            }
        } catch (error) {
            console.log(error.message || "Some error occurred while retrieving data.")
            reject({ message: "Internal error" });
        }
    });
}

getUserbyToken = async(token) => {
    const jwt = await jwt_decode(token)
    let result = await getByUser(jwt.user);
    return result;
}

existEntityByUserId = async(entityId, userId) => {
    let result = await userEntitiesModel.findOne({
        where: {
            entityId: entityId,
            userId: userId
        }
    })
    return (!!result);
}

updateUser = (req) => {
    return new Promise(async(resolve, reject) => {
        try {

            var user = await getUserById(req.params.userId);
            if (!user) {
                reject({ status: 400, message: { message: 'user not found' } });
            }

            const userData = {
                firstName: req.body.firstName ? req.body.firstName : user.firstName,
                lastName: req.body.lastName ? req.body.lastName : user.lastName,
                user: req.body.user ? req.body.user : user.user,
                email: req.body.email ? req.body.email : user.email,
                pass: req.body.pass ? crypto.encryptWithAES(req.body.pass) : user.pass,
                roleId: req.body.rolId ? req.body.rolId : user.rolId
            };

            if (validUserData(userData) && !(await existOtherUserOrEmail(req.params.userId, userData.user, userData.email))) {
                let result = await user.update(userData);
                resolve({ message: 'User updated succesfull.' });
            } else {
                reject({
                    status: 400,
                    message: { message: 'invalid data for update or user and email exist' }
                });
            }

        } catch (error) {
            reject({
                status: 500,
                message: { message: error.message || "Some error occurred while creating data." }
            });
        }
    });
}

updateMe = (req) => {
    return new Promise(async(resolve, reject) => {
        try {
            const jwt = await jwt_decode(req.token)
            let user = await getUserById(jwt.uid);
            
            if (!user) {
                reject({ status: 400, message: { message: 'user not found' } });
            }

            const userData = {
                firstName: req.body.firstName ? req.body.firstName : user.firstName,
                lastName: req.body.lastName ? req.body.lastName : user.lastName,
                user: req.body.user ? req.body.user : user.user,
                email: req.body.email ? req.body.email : user.email,
                pass: req.body.pass ? crypto.encryptWithAES(req.body.pass) : user.pass,
                roleId: req.body.rolId ? req.body.rolId : user.rolId
            };

            if (validUserData(userData) && !(await existOtherUserOrEmail(jwt.uid, userData.user, userData.email))) {

                let result = await user.update(userData);
                resolve({ message: 'User updated succesfull.' });
            } else {
                reject({
                    status: 400,
                    message: { message: 'invalid data for update or user and email exist' }
                });
            }

        } catch (error) {
            reject({
                status: 500,
                message: { message: error.message || "Some error occurred while creating data." }
            });
        }
    });
}

/**
 * Servicio para crear un usuario.
 * Valida que los datos del request sean validos y que no exita el user y email
 * @param {Object} req 
 * @param {Object} res 
 */
signUp = (req) => {
    return new Promise(async(resolve, reject) => {
        //TODO: sacar el hardcode del ROL ID default
        // rol id por default es REFERENTE
        const DEFAULT_ROL_ID = 2;

        try {
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                user: req.body.user,
                email: req.body.email,
                pass: crypto.encryptWithAES(req.body.pass),
                roleId: req.body.rolId ? req.body.rolId : DEFAULT_ROL_ID
            };

            if (validUserData(newUser) && !(await existUserOrEmail(newUser.user, newUser.email))) {
                let result = await userModel.create(newUser);
                resolve({ message: 'Your account has been created successfully.' });
            } else {
                reject({
                    status: 400,
                    message: { message: 'Invalid data or the specified account already exists.' }
                });
            }

        } catch (error) {
            reject({
                status: 500,
                message: { message: error.message || "Some error occurred while creating data." }
            });
        }
    });
}


/**
 * Verifica si los datos de usuario son válido
 * @param {Object} user 
 * @returns True si los datos son válido. False en caso contrario
 */
function validUserData(user) {

    // TODO: mejorar la validación de datos
    if (!user.firstName || !user.lastName || !user.user || !user.email || !user.pass) {
        return false;
    }

    return true;
}


/**
 * Verifica si existe un usuario creado con el mismo nombre de usuario o mail
 * @param {String} user 
 * @param {String} email 
 * @returns True si ya existe un usuario. False en caso contrario
 */
async function existUserOrEmail(user, email) {
    const result = await userModel.findOne({
        attributes: ['id', 'user', 'email'],
        where: {
            [Op.or]: [
                { user: user, },
                { email: email }
            ]
        },
    });

    return (!!result);
}

/**
 * Verifica si existe un usuario creado con el mismo nombre de usuario o mail, que no sea el usuario actual
 * @param {String} user 
 * @param {String} email 
 * @returns True si ya existe un usuario. False en caso contrario
 */
async function existOtherUserOrEmail(userId, user, email) {
    const result = await userModel.findOne({
        attributes: ['id', 'user', 'email'],
        where: {
            [Op.not]: [{
                id: userId
            }],
            [Op.or]: [
                { user: user, },
                { email: email }
            ]
        },
    });
    return (!!result);
}

async function orderPasswordResetEmail(email) {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await getByEmail(email)
            if (!!user) {
                const token = jwt.sign({ 'idToReset': user.id }, vaultService.getPrivateKey(), { expiresIn: TOKEN_RESET_PASSWORD_EXPIRATION_TIME });
                await emailService.send({to: email, subject: 'Reset de password', text: 'Reseteo de password', html: `<p>Puedes cambiar la contraseña de tu cuenta ingresando al link: ${URI_RESET_PASSWORD}?token=${token}</p>`});   
            }
        } catch (error) {
            reject({ status: 500, message: { message: 'something bad happened' } })
        } finally {
            resolve({ message: { message: 'processed'} });
        }
    });
}

async function resetPassword(token, newPassword) {
    return new Promise(async(resolve, reject) => {
        try {
            const { idToReset } = await jwt_decode(token);
            var user = await getUserById(idToReset);
            if (!user) {
                reject({ status: 400, message: { message: 'user not found' } });
            }

            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                user: user.user,
                email: user.email,
                pass: crypto.encryptWithAES(newPassword),
                roleId: user.rolId
            };

            if (validUserData(userData)) {
                let result = await user.update(userData);
                resolve({
                    message: { message: 'Password reset succesfull.' }
                });
            } else {
                reject({
                    status: 400,
                    message: { message: 'Invalid password' }
                });
            }

        } catch (error) {
            reject({
                status: 500,
                message: { message: error || "Some error occurred while creating data." }
            });
        }
    });
}

module.exports = {
    login: login,
    getByUser: getByUser,
    getUserMe: getUserMe,
    signUp: signUp,
    updateUser: updateUser,
    updateMe: updateMe,
    getUserbyToken: getUserbyToken,
    existEntityByUserId: existEntityByUserId,
    orderPasswordResetEmail: orderPasswordResetEmail,
    resetPassword: resetPassword
}