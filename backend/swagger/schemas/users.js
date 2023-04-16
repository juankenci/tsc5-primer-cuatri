const BaseUser = {
    firstName: "nombre nuevo",
    lastName: "apellido nuevo",
    user: "admin",
    email: "admin@undav.gob.ar",
}

const User = {
    id: 1,
    ...BaseUser,
    role: {
        id: 1,
        name: "admin"
    }
}

const UserMeRequest = {
    ...BaseUser,
    pass: "admin"
}

const Response = {
    message: "User updated succesfull."
}

const UserResetPasswordOrderRequest = {
    email: "admin@undav.gob.ar"
}

const UserResetPasswordOrderResponse = {
    message: {
        message: "processed"
    }
}

const UserResetPasswordRequest = {
    newPassword: "admin1"
}

const UserResetPasswordResponse = {
    message: {
        message: "Password reset succesfull."
    }
}

module.exports = {
    UserMeResponse: User,
    UserMePutRequest: UserMeRequest,
    UserMePutResponse: Response,
    UserResetPasswordOrderRequest: UserResetPasswordOrderRequest,
    UserResetPasswordOrderResponse: UserResetPasswordOrderResponse,
    UserResetPasswordRequest: UserResetPasswordRequest,
    UserResetPasswordResponse: UserResetPasswordResponse
}