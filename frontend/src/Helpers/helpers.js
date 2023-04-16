
import { parse, compareAsc } from 'date-fns';
import { es } from 'date-fns/locale';
/**
 * 
 * @param {fecha}  : Datetime
 * @param {divisor = "/" o "-"}
 * @returns string de la forma: "dd-mm-aaaa"
 */
export function formatearFechaParaBackend(fecha, divisor){
    var anio_d = fecha.getFullYear()
    var mes_d = ("0" + (fecha.getMonth() + 1)).slice(-2);
    var dia_d = ("0" + fecha.getDate()).slice(-2);
    return dia_d + divisor + mes_d + divisor + anio_d;        
}

/**
 * Dado un texto genera un nombreAbreviado por defecto
 * para la base de datos
 * Ejemplo: input -> "9 de Julio"
 *          output -> "9DE"
 * @param {texto} : string 
 * @returns : string
 */
export function crearNombreAbreviadoPorDefecto(texto){
    texto = texto.replace(/ /g, "");
    texto = texto.slice(0,3);
    texto = texto.toUpperCase()
    return texto;
}

/**
 * Dado un string de la forma "dd-mm-aaaa"
 * Devuelve "mm/dd/aaaa"
 * Se usa en componente DatePicker
 * @param {date} string
 * @param {dividerIn} string
 * @param {dividerOut} string 
 * @returns: string 
 */
export function formatDateOne(date, dividerIn, dividerOut){
    let dateParts = date.split(dividerIn);
    let day = dateParts[0];
    let month = dateParts[1];
    let age = dateParts[2];
    return month + dividerOut + day + dividerOut + age;
}


export const preparedDateInput = (date) => {
    if(date){
        return new Date(formatDateOne(date, "-", "/"));
    }
    return null;
}
    
/**
 * 
 * @param {*} props 
 * @param {*} nameProp Es el nombre del props pasado en state en Link
 * @param {*} defaultReturn 
 * @returns value of nameProps or false
 */
 export const getPropFromLocation = (props, nameProp, defaultReturn=null) => {
    if(props && props.location && props.location.state && props.location.state[nameProp]){
        return props.location.state[nameProp];
    }
    return defaultReturn;
} 
 
/**
 * 
 * @param {*} a string -> ej: "01:35"
 * @param {*} b string -> ej: "14:04"
 * @returns bool
 */
export const ordenarHoras = (a,b) =>{
    var tiempo1 = a.split(":");
    var tiempo2 = b.split(":");
    var hora1 = tiempo1[0];
    var minuto1 = tiempo1[1];
    var hora2 = tiempo2[0];
    var minuto2 = tiempo2[1];
    // No importa el año para ordenar las horas, es arbitrario
    var h1 = new Date(2005, 1, 1, hora1, minuto1);
    var h2 = new Date(2005, 1, 1, hora2, minuto2);
    return compareAsc(h1, h2);
}

/**
 * 
 * @param {*} a string -> ej: "01/01/2021" o "01-01-2021"
 * @param {*} b string -> ej: "01/01/2021" o "01-01-2021"
 * @param {*} separator string -> "-" o "/"
 * @returns bool
 */
export const ordenarFechas = (a, b, separator) => {
    var format1 = "dd" + separator + "MM" + separator + "yyyy";
    var format2 = "01" + separator + "01" + separator + "1800";
    var a1 = a ? parse(a, format1, new Date(), { locale: es }) : parse(format2, format1, new Date(), { locale: es });
    var b1 = b ? parse(b, format1, new Date(), { locale: es }) : parse(format2, format1, new Date(), { locale: es });
    return compareAsc(a1, b1);
}


/**
 * 
 * @param {*} response La respuesta de la api
 * @returns {result: bool, message: false || string, token: false || string}
 */
export const handleResponse = (response) => {
    // No cambiar los tipos de datos default en value
    let value = {
        result: false,
        message: false,
        token: false,
        apellido: false,
        esComerciante: false,
        cambiarPassword: false
    };
    if(response.data){
        if(response.data.token){
            value.token = response.data.token;
            value.result = true;
            value.message = response.data.msg;
        }
        if(response.data.status === 'success'){
            value.result = true;
            value.message = response.data.msg;
            value.apellido = response.data.apellido || '';
            value.esComerciante = response.data.esComerciante || false;
        }else if(response.data.status === 'fail'){
            value.result = false;
            value.message = response.data.msg;
        }
    }
    return value;    
}


/**
 * 
 * @returns dataUserJson from storage navigator || false
 */
export function getDataUserFromStorageNavigator(){
    let dataUser = localStorage.getItem('usuariosDataTOC');
    if(dataUser){
        return JSON.parse(dataUser);
    }
    return false;
}


export function isFunction(fn){
    return typeof fn === 'function' ? true : false;
}

/**
 * Recibe como argumento un json string
 * Devuelve true si es un jsonString valido
 * de lo contrario, devuelve false
 * Ejemplo de input correcto: '{"id":2}'
  */
 export function isJson(str) {
    const STRING = 'string';
    const BRACKET = '{'; 
    var result = false;
    if(typeof str === STRING && str.indexOf(BRACKET) !== -1){
        try {
            str = JSON.parse(str);
            result = true;
        } catch (e) {
            result = false;
        }
    }
    return result;  
}