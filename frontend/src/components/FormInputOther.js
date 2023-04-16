import { Form, Button, Label, Select } from "semantic-ui-react";
import { Field, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import "../styles/FormInputOther.css"
import { setOtherInfo } from "../api/form";

 const examplePlaceSituation = [
  {
    text: "Alquilado",
    value: "Alquilado",
  },
  {
    text: "Prestado",
    value: "Prestado",
  },
  {
    text: "Propio",
    value: "Propio",
  },
  {
    text: "Otro",
    value: "Otro",
  }
];

const FormInputOther = (props) => {
  const {goPrevForm, other} = props

  const formik = useFormik({
    initialValues: initialValues(other),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      setOtherInfo(JSON.stringify(formData));
      console.log(formData);
    }
  });  


  return (
    <div className="container-fluid container-md">
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 font-weight-bold">
              <label>Composición de trabajadores</label>
            </div>

            <div className="col-12 col-md">
              <div className="middle">Mujeres</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="cant_mujeres"
                value={formik.values.cant_mujeres} 
                error={formik.errors.cant_mujeres && formik.touched.cant_mujeres} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Hombres</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="cant_hombres"
                value={formik.values.cant_hombres} 
                error={formik.errors.cant_hombres && formik.touched.cant_hombres} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Otros</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="cant_otros"
                value={formik.values.cant_otros} 
                error={formik.errors.cant_otros && formik.touched.cant_otros} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <label> Cuántos perciben una remuneración o programa social / cuántos sin remuneración o voluntarios</label>
            </div>

            <div className="col-12 col-md">
              <div className="middle">Remunerados</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="remunerados"
                value={formik.values.remunerados} 
                error={formik.errors.remunerados && formik.touched.remunerados} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Voluntarios</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="voluntarios"
                value={formik.values.voluntarios} 
                error={formik.errors.voluntarios && formik.touched.voluntarios} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md">
              <div className="middle">Cantidad de trabajadores</div>
              <Form.Input
                type="number"
                className='mt-2'
                placeholder="Ingrese cantidad de trabajadores"
                name="cant_trabajadores"
                value={formik.values.cant_trabajadores} 
                error={formik.errors.cant_trabajadores && formik.touched.cant_trabajadores} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Cantidad de personas que asisten al comedor, centro de salud o club</div>
              <Form.Input
                type="number"
                className='mt-2'
                name="personas_asistidas"
                value={formik.values.personas_asistidas} 
                error={formik.errors.personas_asistidas && formik.touched.personas_asistidas} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md">
              <div className="middle">¿Cuál es la situación del espacio físico que utilizan?</div>
              <Form.TextArea
                className='mt-2'
                name="situacion_espacio_fisico"
                value={formik.values.situacion_espacio_fisico} 
                error={formik.errors.situacion_espacio_fisico && formik.touched.situacion_espacio_fisico} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Situacion del inmueble que utilizan</div>
              <Field
                as={Select}
                className='select mt-2'
                onBlur={formik.handleBlur}
                placeholder='Situacion del inmueble'
                name="situacion_inmueble"
                options={examplePlaceSituation}
                value={formik.values.situacion_inmueble} 
                error={formik.errors.situacion_inmueble && formik.touched.situacion_inmueble} 
                onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="middle">¿Integran alguna organización de base? (organización social, agrupamiento gremial, movimiento, Frente, otra) Indicar cuál</div>
              <Form.TextArea
                className='mt-2'
                name="integra_organizacion_base"
                value={formik.values.integra_organizacion_base} 
                error={formik.errors.integra_organizacion_base && formik.touched.integra_organizacion_base} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="middle">¿Tienen o han tenido acceso a subsidio o alguna política del Estado? Indicar cuál</div>
              <Form.TextArea
                className='mt-2'
                name="tiene_subsidio"
                value={formik.values.tiene_subsidio} 
                error={formik.errors.tiene_subsidio && formik.touched.tiene_subsidio} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="middle">Sitios WEB (pueden tener más de un sitio o red social. Por ejemplo: FB, IG y sitio web.)</div>
              <Form.TextArea
                className='mt-2'
                name="sitio_web"
                value={formik.values.sitio_web} 
                error={formik.errors.sitio_web && formik.touched.sitio_web} 
                onChange={formik.handleChange}
              />
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col">
              <div className="middle">Links con videos / notas periodisticas / enlaces de interés (se pueden subir varios enlaces máximo 5)</div>
              <Form.TextArea
                className='mt-2'
                name="links"
                value={formik.values.links} 
                error={formik.errors.links && formik.touched.links} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="col-12 col-md-auto">
              <Label
                  as="label"
                  basic
                  htmlFor="upload"
              >
                <div>
                  <label>Fotografìas (se podrán subir máximo 3 o 4 fotos)</label>
                </div>
                  <Button
                      type="button"
                      icon="upload"
                      label={{
                          basic: true,
                          content: 'Seleccionar archivos'
                      }}
                      labelPosition="right"
                      className="upload-files"
                  />
                  <input
                      hidden
                      id="upload"
                      multiple
                      type="file"
                  />
              </Label>
            </div>

            <div className="col-12 col-md-auto mt-3 mt-md-0">
              <Label
                  as="label"
                  basic
                  htmlFor="upload"
              >
                <div>
                  <label>Audios (se podrán subir máximo 3 o 4 audios</label>
                </div>
                  <Button
                      type="button"
                      icon="upload"
                      label={{
                          basic: true,
                          content: 'Seleccionar archivos'
                      }}
                      labelPosition="right"
                  />
                  <input
                      hidden
                      id="upload"
                      multiple
                      type="file"
                  />
              </Label>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md">
              <div className="middle">Información adicional (informes de investigación, entrevistas, textos etc)</div>
              <Form.TextArea
                className='mt-2'
                name="informacion_adicional"
                value={formik.values.informacion_adicional} 
                error={formik.errors.informacion_adicional && formik.touched.informacion_adicional} 
                onChange={formik.handleChange}
              />
            </div>

            <div className="col-12 col-md">
              <div className="middle mt-3 mt-md-0">Articulaciones con Universidad o con otros espacios</div>
              <Form.TextArea
                className='mt-2'
                name="articulaciones"
                value={formik.values.articulaciones} 
                error={formik.errors.articulaciones && formik.touched.articulaciones} 
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="col d-flex d-md-block flex-nowrap pl-1">
              <Button
                className="button-form before-button"
                type="button"
                onClick={() => {
                  goPrevForm(true)}}>
                Anterior
              </Button>
              <Button 
                className="button-form submit-button" 
                type="submit">
                  Enviar
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div> 
  );
};

function initialValues(other){
  return{
      cant_trabajadores: other?.cant_trabajadores || "",
      cant_mujeres: other?.cant_mujeres || "",
      cant_hombres: other?.cant_hombres || "",
      cant_otros: other?.cant_otros || "",
      remunerados: other?.remunerados || "",
      voluntarios: other?.voluntarios || "",
      personas_asistidas: other?.personas_asistidas || "",
      situacion_espacio_fisico: other?.situacion_espacio_fisico || "",
      situacion_inmueble: other?.situacion_inmueble || "",
      integra_organizacion_base: other?.integra_organizacion_base || "",
      tiene_subsidio: other?.tiene_subsidio || "",
      sitio_web: other?.sitio_web || "",
      links: other?.links || "",
      informacion_adicional: other?.informacion_adicional || "",
      articulaciones: other?.articulaciones || "",
      
  }
}

function validationSchema(){
  return{
      cant_trabajadores: yup.number().required(true).min(0),
      cant_mujeres: yup.number().required(true).min(0),
      cant_hombres: yup.number().required(true).min(0),
      cant_otros: yup.number().required(true).min(0),
      remunerados: yup.number().required(true).min(0),
      voluntarios: yup.number().required(true).min(0),
      personas_asistidas: yup.number().min(0),
      situacion_espacio_fisico: yup.string(),
      integra_organizacion_base: yup.string(),
      tiene_subsidio: yup.string(),
      sitio_web: yup.string(),
      links: yup.string(),
      informacion_adicional: yup.string(),
      articulaciones: yup.string(),
  }

}

export default FormInputOther;
