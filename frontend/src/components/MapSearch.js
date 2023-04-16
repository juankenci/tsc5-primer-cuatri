
import { useState, useEffect,useContext } from "react";
import useAuth from "../hooks/useAuth";
import { getPaises, getElemById, getLatitudLongitud, getLatitudLongitudForCity } from "../utils/fetchLocation"; 
import "../styles/MapSearch.css";
import { Form, Select, Button, TextArea, Dropdown } from "semantic-ui-react";
import { getElem, getElemPorId, getSubunitiesByBranchCategoryId } from "../utils/fetchPersonal";
import TabPane from 'react-bootstrap/TabPane';
import { useFormik, Field, FormikProvider } from "formik";
import * as yup from 'yup';
import { MapSearchContext } from '../context/MapSearchContext';


const MapSearch = (props) => {

 const [branches, setBranches] = useState([])
 const [rubros, setRubros] = useState([])
 const [paises, setPaises] = useState([])
 const [provincies, setProvincies] = useState([])
 const [localidades, setLocalidades] = useState([])

 const {auth} = useAuth();
 const MapFilters = useContext(MapSearchContext);

 const formik = useFormik({
   initialValues: initialValues(),
   validationSchema: yup.object(),
 });

 function initialValues(){
    return{
    
    }
  }

 useEffect(() => {
    (async () => {
      let response = await getElem(auth, "branches")
      response = response? response.map((value) => ({text: value.name, value: value.id})) :[]
      setBranches(response || [])
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      let response = await getElemPorId(auth, formik.values.branch, "branches", "linesOfBusiness")
      response = response? response.map((value) => ({text: value.name, value: value.id})): []
      setRubros(response || [])
    })();
  }, [formik.values.branch, auth]);


  useEffect(() => {
    (async () => {
      let response = await getPaises(auth)
      response = response? response.map((value) => ({text: value.name, value: value.id})).sort((a, b) => a.text > b.text? 1:-1): []
      setPaises(response || [])
    })();
  }, [auth])

  useEffect(() => {
    (async () => {
      if(formik.values.country != ''){
        let response = await getElemById(auth, formik.values.country, "countries", "provinces")
        response = response? response.map((value) => ({text: value.name, value: value.id})): []
        setProvincies(response || [])
      }
    })();
  }, [formik.values.country, auth])
  
  useEffect(() => {
    (async () => {
      if(formik.values.province != ''){
        let response = await getElemById(auth, formik.values.province, "provinces", "districts")
       response = response? response.map((value) => ({text: value.name, value: value.id})).sort((a, b) => a.text > b.text? 1:-1): []
       setLocalidades(response || [])
      }
    })();
  }, [formik.values.province, auth])



  const handleChangeBranch = (newValue) => {
    formik.setFieldValue('branch', newValue);
    MapFilters.addRama(newValue)
    formik.setFieldValue('rubrosSeleccionados', '');
  }
  const handleChangeRubro = (newValue) => {
    formik.setFieldValue('rubrosSeleccionados', newValue);
    MapFilters.addRubro(newValue)
  }

  const handleChangePais = (newValue) => {
    formik.setFieldValue('country', newValue);
    MapFilters.addPais(newValue)
    formik.setFieldValue('province', '');
    setLocalidades([])
    formik.setFieldValue('locality', '');
  
  }

  const handleChangeProvincia = (newValue) => {
    formik.setFieldValue('province', newValue);
    MapFilters.addProvincia(newValue)
    formik.setFieldValue('locality', '');
  }

  const handleChangeLocalidad = (newValue) => {
    formik.setFieldValue('locality', newValue);
    MapFilters.addLocalidad(newValue)
  }
 

  return (
    <TabPane>     
      <div className="container" >
        <div style={{width: '100%'}}>
          <FormikProvider value={formik}>
          <div className="middle mt-3">Ramas</div>
              <Field
                as={Select}
                className='fieldsMapSearch select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la rama'
                name="branche"
                options={branches}
                value={formik.values.branch} 
                
                onChange={(e, { name, value }) => handleChangeBranch(value)}
              />
            <div className="middle mt-3">Rubros</div>
                  <Field
                    as={Select}
                    className=' fieldsMapSearch select mt-2'
                    onBlur={formik.handleBlur}
                    placeholder='Seleccione un rubro'
                    name="rubro"
                    options={rubros}
                    value={formik.values.rubrosSeleccionados}

                    onChange={(e, { name, value }) => handleChangeRubro(value)}
                  />
            <div className="middle">Pais</div>
              <Field
                as={Select}
                className='fieldsMapSearch select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione el pais'
                name="pais"
                options={paises}
                value={formik.values.country} 
                error={formik.errors.country && formik.touched.country}
                onChange={(e, { name, value }) => handleChangePais(value)}
              />

              <div className="middle mt-3">Provincia</div>
              <Field
                as={Select}
                className='fieldsMapSearch select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la provincia'
                name="provincia"
                options={provincies}
                value={formik.values.province} 
                error={formik.errors.province && formik.touched.province} 
                onChange={(e, { name, value }) => handleChangeProvincia(value)}
              />

              <div className="middle mt-3">Localidad</div>
              <Field
                as={Select}
                className='fieldsMapSearch select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la localidad'
                name="localidad"
                options={localidades}
                value={formik.values.locality}
                error={formik.errors.locality && formik.touched.locality} 
                onChange={(e, { name, value }) => handleChangeLocalidad(value)}
              />
            </FormikProvider>
            </div>
        </div>
    </TabPane>



    )}


export default  MapSearch