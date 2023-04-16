const userService = require('../services/userService')

exports.loginService = async(req, res) => {
    try {
        let result = await userService.login(req.body);
        res.send(result);
    } catch (error) {
        res.status(401).send(error);
    }


}

exports.signupService = async(req, res) => {
    try {
        let result = await userService.signUp(req);
        res.send(result);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

exports.getUserMe = async(req, res) => {
    try {
        let result = await userService.getUserMe(req.token);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateUserMe = async(req, res) => {
    try {
        let result = await userService.updateMe(req);
        res.send(result);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

exports.orderPasswordResetEmail = async(req, res) => {
    try {
        let result = await userService.orderPasswordResetEmail(req.body.email);
        res.send({message: {message: "processed"}});
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

exports.resetPassword = async(req, res) => {
    try {
        let result = await userService.resetPassword(req.token, req.body.newPassword);
        res.send(result);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}