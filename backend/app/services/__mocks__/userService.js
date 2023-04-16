const jwt = require('jsonwebtoken');
const crypto = require('../../utils/CryptoJS')

const vaultService = require('./vaultService');

exports.login = async (req, res) => {
    const {user, pass, uid, email} = req.body;
    if(await vaultService.verifyCredentials(user, pass)) {
        const token = jwt.sign({ user, uid, email }, vaultService.getPrivateKey(), { expiresIn: 120 });
        res.send({token, expire: '120'});
    } else {
        res.send({error: 'Invalid credentials'})
    }
}

exports.signUp = (req, res) => {
    const { user, pass, admin } = req.body
    if(user && pass && admin != undefined) {
        userModel.create({
            user: user,
            pass: crypto.encryptWithAES(pass),
            admin: admin,
            createdAt: (new Date()),
            updatedAt: (new Date())
        })
        .then((result) =>  {
            if(result) {
                res.status(200).send({message: 'Your account has been created successfully.'});
            } else {
                res.status(404).send({ text: 'Schema does not exist!'});
            }
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating data."
            });
        })
    } else {
        res.status(400).send({message: 'One or more params are missing'});
    }
}

