import "../FormTabs/FormContainer.css";
import "../styles/FormInputPersonalInfo.css";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { getElem, getElemPorId, getSubunitiesByBranchCategoryId } from "../utils/fetchPersonal";
import { Form, Select, Button, TextArea, Dropdown } from "semantic-ui-react";
import TabPane from 'react-bootstrap/TabPane';
import { useFormik, Field, FormikProvider } from "formik";
import * as yup from 'yup';
import { setPersonalInfo } from "../api/form";
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const FormInputPersonal = (props) => {
  const {personalValues, expresiones, goNextForm} = props;

  const [branches, setBranches] = useState([])
  const [rubros, setRubros] = useState([])
  const [subrubros, setSubrubros] = useState([])
  const [unities, setUnities] = useState([])
  const [subunities, setSubunities] = useState([])
  const [services, setServices] = useState([])
  const [legalForms, setLegalForms] = useState([])
  
  const {auth} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(personalValues),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      if(Object.keys(formData["rubrosSubrubrosSeleccionados"]).length == 0) return;

      setPersonalInfo(JSON.stringify(formData));
      goNextForm(true);
    }
  });
  
  //Se ejecuta desde un principio, no depende del resto.
  useEffect(() => {
    (async () => {
      let response = await getElem(auth, "branches")
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setBranches(response || [])
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      let response = await getElemPorId(auth, formik.values.branch, "branches", "linesOfBusiness")
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setRubros(response || [])
    })();
  }, [formik.values.branch, auth]);

  useEffect(() => {
    (async () => {
      let response = await getElemPorId(auth, formik.values.rubrosSeleccionados, "lineOfBusiness", "sublinesOfBusiness")
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setSubrubros(response || [])
      
      formik.setFieldValue('subrubros', formik.values.rubrosSubrubrosSeleccionados[formik.values.rubrosSeleccionados]?.map(function(subrubro){
        return subrubro["value"]
      }) || []);
    })();
  }, [formik.values.rubrosSeleccionados, auth]);

  useEffect(() => {
    (async () => {
      let response = await getElemPorId(auth, formik.values.branch, "branches","categories")
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setUnities(response || [])
    })();
  }, [formik.values.branch, auth]);

  useEffect(() => {
    (async () => {
      let response = await getSubunitiesByBranchCategoryId(auth, formik.values.tipoUnidadProductiva, formik.values.branch)
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setSubunities(response || [])
    })();
  }, [formik.values.branch, formik.values.tipoUnidadProductiva, auth]);
  
  useEffect(() => {
    (async () => {
      const response = await getElem(auth, "services")
      setServices(response || [])
    })();
  }, [auth]);

  //Se ejecuta desde un principio, no depende del resto.
  useEffect(() => {
    (async () => {
      let response = await getElem(auth, "legalForms")
      response = response?.map((value) => ({text: value.name, value: value.id}))
      setLegalForms(response || [])
    })();
  }, [auth]);
  
  const handleChangeBranch = (newValue) => {
    formik.setFieldValue('branch', newValue);
    formik.setFieldValue('rubrosSeleccionados', '');
  }

  const handleChangeRubro = (newValue) => {
    formik.setFieldValue('rubrosSeleccionados', newValue);
    setSubrubros([]);
  }

  const handleChangeSubrubro = (values) => {
    formik.setFieldValue('subrubros', values);
    let subrubrosSeleccionados = values.map(function(subrubro){
      return {
        "text": subrubros.filter(val => val['value'] == subrubro)[0].text,
        "value": subrubro
      }
    });
    formik.values.rubrosSubrubrosSeleccionados[formik.values.rubrosSeleccionados] = subrubrosSeleccionados;

    if(formik.values.rubrosSubrubrosSeleccionados[formik.values.rubrosSeleccionados].length == 0){
      delete formik.values.rubrosSubrubrosSeleccionados[formik.values.rubrosSeleccionados];
    }
  }

  const handleChangeServices = (newValue) => {
    formik.setFieldValue('services', newValue);
  }

  const handleChangeLegalForm = (newValue) => {
    formik.setFieldValue('legalForm', newValue);
  }

  const handleChangeDateActivities = (newValue) => {
    formik.setFieldValue('dateActivities', newValue);
  }

  const handleChangeTipoUnidadProductiva = (newValue) => {
    formik.setFieldValue('tipoUnidadProductiva', newValue);
  }

  const handleChangeSubUnit = (newValue) => {
    formik.setFieldValue('subUnit', newValue);
  }

  function deleteRubroSubrubros(rubro){
    delete formik.values.rubrosSubrubrosSeleccionados[rubro];
    formik.setFieldValue('rubrosSubrubrosSeleccionados', formik.values.rubrosSubrubrosSeleccionados);
    formik.setFieldValue('rubrosSeleccionados', "");
    formik.setFieldValue('subrubros', []);
  }

  function initialValues(personal){
    return{
      productiveUnit: personal?.productiveUnit || "",
      branch: personal?.branch || "",
      rubrosSeleccionados: personal?.rubrosSeleccionados || "",
      tipoUnidadProductiva: personal?.tipoUnidadProductiva || "",
      subUnit: personal?.subUnit || "",
      subrubros: personal?.subrubros || [],
      rubrosSubrubrosSeleccionados: personal?.rubrosSubrubrosSeleccionados || {},
      services: personal?.services || "",
      legalForm: personal?.legalForm || "",
      dateActivities: personal?.dateActivities ? new Date(personal?.dateActivities) : ""
    }
  }

  function validationSchema(){
    return{
      productiveUnit: yup.string().required(true).matches(expresiones.nombre),
      branch: yup.string().required(true),
      rubrosSubrubrosSeleccionados: yup.object().required(true),
      tipoUnidadProductiva: yup.string().required(true),
      subUnit: yup.string().required(true),
      services: yup.string().required(true).matches(expresiones.nombre),
      legalForm: yup.string().required(true)
    }
  }

  return (
    <div className="container-fluid container-md">
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 col-md">
              <div className="middle">Nombre de la Unidad Productiva</div>
              <Form.Input
                type="text"
                className='mt-2'
                placeholder="Ingrese la Unidad Productiva"
                name="productiveUnit"
                value={formik.values.productiveUnit} 
                error={formik.errors.productiveUnit && formik.touched.productiveUnit} 
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Fecha de inicio de actividades</div>
              <SemanticDatepicker
                  id="initialDate"
                  className="m-0 mt-2"
                  value={formik.values.dateActivities}
                  error={formik.errors.dateActivities}
                  placeholder="DD-MM-AAAA"
                  format={"DD-MM-YYYY"}
                  onChange={(e, { value }) => handleChangeDateActivities(value)}
                  required
              />
              <small class="form-text text-muted information-text m-0 mt-1">
                Puede escribir la fecha o seleccionarla haciendo click.
              </small>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="middle mt-3">Ramas de la Economia Popular</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la rama'
                name="branche"
                options={branches}
                value={formik.values.branch} 
                error={formik.errors.branch && formik.touched.branch}
                onChange={(e, { name, value }) => handleChangeBranch(value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <small class="form-text text-muted information-text">
                <span className="font-weight-bold">¿Cómo selecciono rubros y subrubros?</span>
              </small>
              <small class="form-text text-muted information-text">
                Debe seleccionar un rubro y luego los subrubros que quiera. Vera lo seleccionado en la sección "Rubros y subrubros seleccionados".
              </small>
              <small class="form-text text-muted information-text">
                Luego puede seleccionar otro rubro y otros subrubros para seguir agregando los que desee.
              </small>
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3">Rubros</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione un rubro'
                name="rubro"
                options={rubros}
                value={formik.values.rubrosSeleccionados}
                error={((Object.keys(formik.values.rubrosSubrubrosSeleccionados).length == 0 || formik.values.rubrosSeleccionados.length == 0) && formik.touched.rubrosSeleccionados)}
                onChange={(e, { name, value }) => handleChangeRubro(value)}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3">Subrubros para rubro seleccionado</div>
              <Dropdown 
                placeholder='Seleccione uno o mas subrubros'
                className="mt-2"
                value={formik.values.subrubros}
                fluid
                multiple
                selection
                options={subrubros}
                error={((Object.keys(formik.values.rubrosSubrubrosSeleccionados).length == 0) && formik.touched.subrubros)}
                onChange={(e, { value }) => handleChangeSubrubro(value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="middle mt-3">Rubros y subrubros seleccionados</div>
              <div className="boxRubrosSubrubros mt-2 p-2" name="boxRubrosSubrubros">
                <div className="row m-0 mb-2 pb-1 border-bottom">
                  <div className="col font-weight-bold boxRubrosSubrubros-title">RUBROS SELECCIONADOS</div>
                  <div className="col font-weight-bold boxRubrosSubrubros-title">SUBRUBROS SELECCIONADOS</div>
                  <div className="col-3 col-md-2"></div>
                </div>
                {
                  Object.keys(formik.values.rubrosSubrubrosSeleccionados).map(rubro => {
                    return (
                      <div className="row m-0 mt-2 pb-2 border-bottom">
                        <div className="col align-self-center">{rubros.filter(val => val['value'] == rubro)[0]?.text}</div>
                        <div className="col coma align-self-center">{formik.values.rubrosSubrubrosSeleccionados[rubro].map(subrubro =>{
                            return(
                              <span>{subrubro.text}</span>
                            )
                          })}
                        </div>
                        <div className="col-3 col-md-2">
                          <button type="button" onClick={(e) => deleteRubroSubrubros(rubro)} class="btn btn-danger btn-sm btn-sm font-weight-bold">Eliminar</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col">
              <div className="middle mt-3">Bienes y servicios</div>
              <Field
                as={TextArea}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Cuentenos sobre la funcionalidad de la Organizacion'
                name="services"
                options={services}
                value={formik.values.services} 
                error={formik.errors.services && formik.touched.services}
                onChange={(e, { name, value }) => handleChangeServices(value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md">
              <div className="middle mt-3">Tipo de Unidad productiva</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la unidad productiva'
                name="tipoUnidadProductiva"
                options={unities}
                value={formik.values.tipoUnidadProductiva} 
                error={formik.errors.tipoUnidadProductiva && formik.touched.tipoUnidadProductiva}
                onChange={(e, { name, value }) => handleChangeTipoUnidadProductiva(value)}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3">Sub Unidad</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione una subunidad'
                name="subUnit"
                options={subunities}
                value={formik.values.subUnit} 
                error={formik.errors.subUnit && formik.touched.subUnit}
                onChange={(e, { value }) => handleChangeSubUnit(value)}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col">
              <div className="middle mt-3">Formas legales</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Seleccione la forma legal'
                name="legalForm"
                options={legalForms}
                value={formik.values.legalForm} 
                error={formik.errors.legalForm && formik.touched.legalForm}
                onChange={(e, { name, value }) => handleChangeLegalForm(value)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <Button 
                className="button-form next-button"
                type="submit">
                Siguiente
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default FormInputPersonal;
