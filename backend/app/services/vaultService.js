const crypto = require('../utils/CryptoJS');
const userModel = require('../models').users;


//Get user from database
function getUserFromDB (usr) {
    return new Promise((resolve) => {
        userModel.findAll({ where: { user: usr } })
        .then((result) =>  {
            if(result) {
                resolve(result);
            } else {
                console.log('Schema does not exist!');
            }
        })
        .catch(err => {
            console.log(err.message || "Some error occurred while retrieving data.")
        });
    })
}

//Get user from database
exports.getUserFromDB2 = (usr) => {
    return new Promise((resolve) => {
        userModel.findAll({ where: { user: usr } })
        .then((result) =>  {
            if(result) {
                resolve(result);
            } else {
                console.log('Schema does not exist!');
            }
        })
        .catch(err => {
            console.log(err.message || "Some error occurred while retrieving data.")
        });
    })
}

//Verify if credentials match witch hash
exports.verifyCredentials = (user, pass) => {
    return new Promise(async (resolve) => {
        const userResult = await getUserFromDB(user);
        console.log(userResult)
        if (userResult[0]) {
            if(crypto.compare(pass, userResult[0].dataValues.pass)) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }
    })
}

exports.getPrivateKey = () => process.env.SECRET;
