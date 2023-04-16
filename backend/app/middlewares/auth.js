const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
// const user = require('../models').users;
const userService = require('../services/userService')

exports.isAuthenticated = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET, (err, data) => {
            console.log(err)
            if (err) {
                res.status(401).send({ message: "Token does not match" });
            } else {
                if (!data.user || !data.email) {
                    res.status(401).send({ message: "Token is not correct" });
                } else {
                    next();
                }
            }
        });
    } else {
        res.status(403).send({ error: "Token is required" });
    }
}

exports.isAuthenticatedToReset = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader)

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET, (err, data) => {
            console.log(err)
            if (err) {
                res.status(401).send({ message: "Token does not match" });
            } else {
                if (!data.idToReset) {
                    res.status(401).send({ message: "Token is not correct" });
                } else {
                    next();
                }
            }
        });
    } else {
        res.status(403).send({ error: "Token is required" });
    }
}

exports.isAuthorized = async(req, res, next) => {
    const jwt = jwt_decode(req.token)
    if (jwt) {
        try {
            let result = await userService.getByUser(jwt.user);
            if (result && result.role.name === 'admin') {
                next()
            } else {
                res.status(403).send({ message: "Unauthorized" });
            }
        } catch (error) {
            res.status(500).send({ message: "Internal error" });
            console.log(error.message || "Some error occurred while retrieving data.")
        }
    } else {
        res.status(400).send({ message: "Check parameters" });
    }
}