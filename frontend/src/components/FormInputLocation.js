import { useEffect, useState } from "react";
import TabPane from 'react-bootstrap/TabPane'
import "../styles/FormInputLocation.css";
import useAuth from "../hooks/useAuth";
import { getPaises, getElemById, getLatitudLongitud, getLatitudLongitudForCity } from "../utils/fetchLocation"; 
import { Form, Select, Button } from "semantic-ui-react";
import { setLatitudLongitud, setLocationInfo } from "../api/form";
import { useFormik, Field, FormikProvider } from "formik";
import * as yup from 'yup';

const FormInputLocation = (props) => {
  const {locationValues, expresiones, goNextForm, goPrevForm} = props;

  //latitud y longitud por defecto para la marca (avellaneda)
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [paises, setPaises] = useState([])
  const [provincies, setProvincies] = useState([])
  const [localidades, setLocalidades] = useState([])
  const [municipios, setMunicipios] = useState([])
  const [searchingLatitudeLongitude, setSearchingLatitudeLongitude] = useState(false)
  const {auth} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(locationValues),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      setLocationInfo(JSON.stringify(formData));
      goNextForm(true);
    }
  });

  useEffect(() => {
    (async () => {
      let response = await getPaises(auth)
      response = response?.map((value) => ({text: value.name, value: value.id})).sort((a, b) => a.text > b.text? 1:-1)
      setPaises(response || [])
    })();
  }, [auth])

  useEffect(() => {
    (async () => {
      if(formik.values.country != ''){
        let response = await getElemById(auth, formik.values.country, "countries", "provinces")
        response = response?.map((value) => ({text: value.name, value: value.id}))
        setProvincies(response || [])
      }
    })();
  }, [formik.values.country, auth])
  
  useEffect(() => {
    (async () => {
      if(formik.values.province != ''){
        let response = await getElemById(auth, formik.values.province, "provinces", "districts")
        response = response?.map((value) => ({text: value.name, value: value.id}))
        setLocalidades(response || [])
      }
    })();
  }, [formik.values.province, auth])
  
  useEffect(() => {
    (async () => {
      if(formik.values.locality != ''){
        let response = await getElemById(auth, formik.values.locality, "districts","localities")
        response = response?.map((value) => ({text: value.name, value: value.id}))
        setMunicipios(response || [])
      }
    })();
  }, [formik.values.locality, auth])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      (async () => {
        if(formik.values.locality != '' && formik.values.street != '' && formik.values.streetNumber != ''
            && provincies.length > 0 && paises.length > 0 && localidades.length > 0){
          saveLatitudLongitud('', '', false);
          setSearchingLatitudeLongitude(true);

          let foundLocationWithStreet = true;
          let province = provincies.filter(province => province['value'] == formik.values.province)[0]['text'];
          let country = paises.filter(country => country['value'] == formik.values.country)[0]['text'];
          let locality = localidades.filter(locality => locality['value'] == formik.values.locality)[0]['text'];
          
          let response = await getLatitudLongitud(formik.values.street, formik.values.streetNumber, province, country, locality);
          
          //Si la anterior no trajo nada, obtengo la ubicacion de la localidad
          if(response.length == 0){
            foundLocationWithStreet = false;
            response = await getLatitudLongitudForCity(province, country, locality);
          }

          setSearchingLatitudeLongitude(false)
          
          if(response.length > 0){
            saveLatitudLongitud(response[0]['lat'], response[0]['lon'], foundLocationWithStreet);
          }
        }
      })();
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [formik.values.locality, formik.values.street, formik.values.streetNumber]);

  const handleChangePais = (newValue) => {
    formik.setFieldValue('country', newValue);
    formik.setFieldValue('province', '');
    setLocalidades([])
    formik.setFieldValue('locality', '');
    setMunicipios([])
  }

  const handleChangeProvincia = (newValue) => {
    formik.setFieldValue('province', newValue);
    setMunicipios([])
    formik.setFieldValue('locality', '');
  }

  const handleChangeLocalidad = (newValue) => {
    formik.setFieldValue('locality', newValue);
    formik.setFieldValue('municipality', '');
  }

  const handleChangeMunicipio = (newValue) => {
    formik.setFieldValue('municipality', newValue);
  }

  function saveLatitudLongitud(latitud, longitud, foundLocationWithStreet){
    setLat(latitud);
    setLon(longitud);

    //Guardamos en localstorage
    setLatitudLongitud(JSON.stringify({
      'lat': latitud,
      'lon': longitud,
      'foundLocationWithStreet': foundLocationWithStreet
    }));
  }

  function initialValues(location){
    return{
      country: location?.country || "",
      province: location?.province || "",
      locality: location?.locality || "",
      municipality: location?.municipality || "",
      neighborhood: location?.neighborhood || "",
      street: location?.street || "",
      streetNumber: location?.streetNumber || "",
      betweenStreets: location?.betweenStreets || ""
    }
  }
  
  function validationSchema(){
    return{
      country: yup.string().required(true),
      province: yup.string().required(true),
      locality: yup.string().required(true),
      municipality: yup.string().required(true),
      neighborhood: yup.string().required(true).matches(expresiones.nombre),
      street: yup.string().required(true).matches(expresiones.nombre),
      streetNumber: yup.number().required(true),
      betweenStreets: yup.string().required(true).matches(expresiones.nombre)
    }
  }

  return (
    <div className="container-fluid container-md">
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-md">
              <div className="middle">Pais</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione el pais'
                name="pais"
                options={paises}
                value={formik.values.country} 
                error={formik.errors.country && formik.touched.country}
                onChange={(e, { name, value }) => handleChangePais(value)}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Provincia</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la provincia'
                name="provincia"
                options={provincies}
                value={formik.values.province} 
                error={formik.errors.province && formik.touched.province} 
                onChange={(e, { name, value }) => handleChangeProvincia(value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md">
              <div className="middle mt-3">Localidad</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la localidad'
                name="localidad"
                options={localidades}
                value={formik.values.locality}
                error={formik.errors.locality && formik.touched.locality} 
                onChange={(e, { name, value }) => handleChangeLocalidad(value)}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3">Municipio</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione el municipio'
                name="municipio"
                options={municipios}
                value={formik.values.municipality}
                error={formik.errors.municipality && formik.touched.municipality} 
                onChange={(e, { name, value }) => handleChangeMunicipio(value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md">
              <div className="middle mt-3">Calle</div>
              <Form.Input
                type="text"
                className="mt-2"
                placeholder="Ingrese la calle"
                name="street"
                value={formik.values.street} 
                error={formik.errors.street && formik.touched.street} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3">Número</div>
              <Form.Input
                type="number"
                className="mt-2"
                placeholder="Ingrese el número de la calle"
                name="streetNumber"
                value={formik.values.streetNumber}
                error={formik.errors.streetNumber && formik.touched.streetNumber} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md">
              <div className="middle mt-3">Barrio</div>
              <Form.Input
                type="text"
                className="mt-2"
                placeholder="Ingrese el barrio"
                name="neighborhood"
                value={formik.values.neighborhood} 
                error={formik.errors.neighborhood && formik.touched.neighborhood} 
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-12 col-md">
              <div className="middle mt-3">Entre calles</div>
              <Form.Input
                type="text"
                className="mt-2"
                placeholder="Entre calles"
                name="betweenStreets"
                value={formik.values.betweenStreets} 
                error={formik.errors.betweenStreets && formik.touched.betweenStreets} 
                onChange={formik.handleChange}
              />
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
                disabled={searchingLatitudeLongitude}
                className="button-form next-button p-relative"
                type="submit">
                <span hidden={searchingLatitudeLongitude}>Siguiente</span>
                <div hidden={!searchingLatitudeLongitude} className="loader"></div>
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default FormInputLocation;