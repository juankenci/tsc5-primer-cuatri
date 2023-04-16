const SublineOfBusinessByLineOfSubinessPrivateResponse = {
    id: 1,
    name: "Radio",
}

const SublineOfBusinessPrivateResponse = {
    ...SublineOfBusinessByLineOfSubinessPrivateResponse,
    lineOfBusinessId: 60
}

module.exports = {
    SublineOfBusinessPrivateResponse,
    SublinesOfBusinessPrivateResponse : [ SublineOfBusinessPrivateResponse ],
    SublinesOfBusinessByLineOfSubinessPrivateResponse: [ SublineOfBusinessByLineOfSubinessPrivateResponse ] 
}