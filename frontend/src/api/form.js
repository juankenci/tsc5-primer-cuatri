import { CONTACT_INFO, OTHER_INFO, LATITUD_LONGITUD, LOCATION_INFO, PERSONAL_INFO } from "../utils/constants"

export function setLocationInfo(locationInfo){
    localStorage.setItem(LOCATION_INFO, locationInfo)
}

export function getLocationInfo(){
    return localStorage.getItem(LOCATION_INFO)
}

export function setPersonalInfo(personalInfo){
    localStorage.setItem(PERSONAL_INFO, personalInfo)
}

export function getPersonalInfo(){
    return localStorage.getItem(PERSONAL_INFO)
}

export function setContactInfo(contactInfo){
    localStorage.setItem(CONTACT_INFO, contactInfo)
}

export function getContactInfo(){
    return localStorage.getItem(CONTACT_INFO)
}

export function setOtherInfo(otherInfo){
    localStorage.setItem(OTHER_INFO, otherInfo)
}

export function getOtherInfo(){
    return localStorage.getItem(OTHER_INFO)
}

export function setLatitudLongitud(latitudLongitud){
    localStorage.setItem(LATITUD_LONGITUD, latitudLongitud)
}

export function getLatitudLongitud(){
    return localStorage.getItem(LATITUD_LONGITUD)
}