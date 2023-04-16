const SignupRequest = {
    firstName: "string",
    lastName: "string",
    user: "string",
    email: "string",
    pass: "string",
    roleId: 1
}

const SignupResponse = { 
    message: "string" 
}

const LoginRequest = {
    user: "string",
    pass: "string"
}

const LoginSuccessfulResponse = {
    token: "string",
    expire: "string"
}

const LoginFailedResponse = {
    error: "string"
}
module.exports = {
    SignupRequest,
    SignupResponse,
    LoginRequest,
    LoginSuccessfulResponse,
    LoginFailedResponse
}