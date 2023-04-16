const Role = {
    name: "admin",
    active: true
}

const RoleResponse = {
    id: 1,
    ...Role,
    createdAt: "2022-11-12T15:34:20.064Z",
    updatedAt: "2022-11-12T15:34:20.064Z"
}

const Response = {
    message: "The role has been created successfully."
}

module.exports = {
    CreateRoleReq: Role,
    CreateRoleResponse: Response,
    GetRoleByIdResponse: RoleResponse,
    GetAllRolesResponse: [ RoleResponse ]
}