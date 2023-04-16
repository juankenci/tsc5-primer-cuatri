import {Form, Button} from "semantic-ui-react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { setContactInfo } from "../api/form";
import "../styles/FormInputContact.css"

const FormInputContact = (props) => {
  const {contact, goNextForm, goPrevForm} = props

  const formik = useFormik({
    initialValues: initialValues(contact),
    validationSchema: yup.object(validationSchema()),
    onSubmit: (formData) => {
      setContactInfo(JSON.stringify(formData));
      goNextForm(true);
    }
  });  

  return (
    <div className="container-fluid container-md">
      <Form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-12 col-md">
            <div className="middle">Referente</div>
            <Form.Input
              type="text"
              className="mt-2"
              placeholder="Ingrese Referente"
              name="referente"
              value={formik.values.referente} 
              error={formik.errors.referente && formik.touched.referente} 
              onChange={formik.handleChange}
            />
          </div>

          <div className="col-12 col-md">
            <div className="middle mt-3 mt-md-0">Telefono</div>
            <Form.Input
              type="number"
              className="mt-2"
              placeholder="Ingrese telefono"
              name="telefono"
              value={formik.values.telefono} 
              error={formik.errors.telefono && formik.touched.telefono} 
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md">
            <div className="middle mt-3">Celular</div>
            <Form.Input
              type="number"
              className="mt-2"
              placeholder="Ingrese celular"
              name="celular"
              value={formik.values.celular} 
              error={formik.errors.celular && formik.touched.celular} 
              onChange={formik.handleChange}
            />
          </div>

          <div className="col-12 col-md">
            <div className="middle mt-3">Correo Electronico</div>
            <Form.Input
              type="email"
              className="mt-2"
              placeholder="Ingrese email"
              name="email"
              value={formik.values.email} 
              error={formik.errors.email && formik.touched.email} 
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col d-flex d-md-block flex-nowrap pl-1">
            <Button className="button-form before-button" type="button"
              onClick={() => {goPrevForm(true);}}>
                Anterior
            </Button>
            <Button className="button-form next-button" type="submit">Siguiente</Button>
          </div>
        </div>
      </Form>
    </div>   
  );
};

function initialValues(contact){
  return{
      referente: contact?.referente || "",
      celular: contact?.celular || "",
      telefono: contact?.telefono || "",
      email: contact?.email || ""
  }
}

function validationSchema(){
  return{
      referente: yup.string().required(true),
      celular: yup.number().required(true),
      telefono: yup.number().required(true),
      email: yup.string().email(true).required(true)
  }
}
     

export default FormInputContact;
