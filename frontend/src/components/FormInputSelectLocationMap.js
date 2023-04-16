import "../styles/FormInputSelectLocationMap.css";
import { useEffect, useState } from "react";
import {Button} from "semantic-ui-react";
import { getLatitudLongitud, setLatitudLongitud } from "../api/form";
import { LATITUD_LONGITUD } from "../utils/constants";
import FormInputLocationMap from "./FormInputLocationMap";

const FormInputSelectLocationMap = ({goNextForm, goPrevForm}) => {
    const latitudLongitudInfo = JSON.parse(getLatitudLongitud(LATITUD_LONGITUD));
    const foundLocationWithStreet = latitudLongitudInfo['foundLocationWithStreet'];
    const [lat, setLat] = useState(latitudLongitudInfo['lat']);
    const [lon, setLon] = useState(latitudLongitudInfo['lon']);

    useEffect(() => {
        //Guardamos en localstorage
        setLatitudLongitud(JSON.stringify({
            'lat': lat,
            'lon': lon,
            'foundLocationWithStreet': foundLocationWithStreet
        }));
      }, [lat, lon])

    return (
        <div className="container-fluid container-md">
            <div className="row">
                <div className="col">
                    <p className="subtitle-1">{foundLocationWithStreet ? '¡Encontramos tu dirección!' : '¡No pudimos encontrar tu dirección!'}</p>
                    <p className="subtitle-2 mt-2 mb-3">{foundLocationWithStreet ? 'Pero si querés podes cambiarla haciendo click en el mapa' : 'Por favor buscala en el mapa'}</p>
                    <FormInputLocationMap setLon={setLon} setLat={setLat} lat={lat} lon={lon} center={[lon, lat]}></FormInputLocationMap>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col d-flex d-md-block flex-nowrap pl-1">
                    <Button 
                        className="button-form before-button" type="button"
                        onClick={() => {
                        goPrevForm(true)}}>
                        Anterior
                    </Button>
                    <Button 
                        className="button-form next-button"
                        onClick={() => {
                        goNextForm(true);}}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FormInputSelectLocationMap;