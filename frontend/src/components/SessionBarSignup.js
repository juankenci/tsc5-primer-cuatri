import React from "react";
import {Form, Button} from 'react-bootstrap';                                           
import { useForm, Controller } from "react-hook-form";
import axios from '../Helpers/API';                
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';


                                                                                                     
function SessionBarSignup(props) {     
    const {showLoginModal, login} = props                                                                     
    const { control, reset} = useForm() 
      
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: (formData) => {
            onSubmit(formData)
            initialValues()
        }
    })
                                                                                                       
    const onSubmit = async(data) => {                                                                                                                                            
      return axios.post('signup', data)                                                        
      .then(result => {                                
        props.onHide()                                                
        props.setMessageTitle("Info")
        props.setMessageText("Su registro ha sido exitoso!!!, por favor ingrese al sistema con sus cedenciales")
        props.showMessage()
        login(data)
        //cuando este todo ok entonces e cierra 
        //props.onHide()
      })                                                                                               
      .catch(error => {
        props.onHide()                                                
        props.setMessageTitle("Error");
        props.showMessage()
        if(error.response.status === 400){
          props.setMessageText("Usuario y/o mail ya registrados")          
        }else{
          props.setMessageText("Algo malo paso.... por favor intentelo nuevamente")
        }
      })
                                         
    }                                                                                                  
                                                                                                       
    return (                                                                   
      <Modal
              size="sm"
              show={props.show}
              onHide={props.onHide}
              aria-labelledby="modal-confirmar"
              animation={true}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                          Registrarme
                  </Modal.Title>
              </Modal.Header>
              <Form onSubmit={formik.handleSubmit} onReset={reset} >                                        
              <Modal.Body>
                  <Form.Group className="mb-3" controlId="NameUser">                                       
                  <Form.Label>Nombre</Form.Label>                                                                    
                      <Form.Control 
                          isInvalid={formik.errors.firstName && formik.touched.firstName}  
                          name="firstName"
                          onChange={formik.handleChange}
                          type="text"                                                          
                          placeholder="Ingrese su nombre" />                                                
                      <Form.Control.Feedback type="invalid">                                                     
                          {formik.errors.firstName}                                                                
                      </Form.Control.Feedback>                                                                   
                  </Form.Group>  

                  <Form.Group className="mb-3" controlId="LastnameUser">                                       
                  <Form.Label>Apellido</Form.Label>                                                                          
                        <Form.Control 
                          isInvalid={formik.errors.lastName && formik.touched.lastName}  
                          name="lastName"
                          onChange={formik.handleChange}
                          type="text"                                                                                
                          placeholder="Ingrese su apellido" />                                                
                        <Form.Control.Feedback type="invalid">                                                     
                          {formik.errors.lastName}                                                               
                        </Form.Control.Feedback>                                                                   
                  </Form.Group> 
                  
                  <Form.Group className="mb-3" controlId="formUsername">                                       
                  <Form.Label>Usuario</Form.Label>                                                                                 
                        <Form.Control 
                          isInvalid={formik.errors.user && formik.touched.user}  
                          name="user"
                          onChange={formik.handleChange}
                          type="text"                                                            
                          placeholder="Ingrese nombre de usuario" />                                              
                        <Form.Control.Feedback type="invalid">                                                     
                          {formik.errors.user}                                                                
                        </Form.Control.Feedback>                                                                   
                  </Form.Group>                                                                                
                                                                                                              
                  <Form.Group className="mb-3" controlId="formEmail">                                          
                  <Form.Label>Email</Form.Label>                                                                                       
                        <Form.Control 
                          isInvalid={formik.errors.email && formik.touched.email}  
                          name="email"
                          onChange={formik.handleChange}
                          type="email"                                                            
                          placeholder="Ingrese email" />                                                              
                        <Form.Control.Feedback type="invalid">                                                     
                          {formik.errors.email}                                                                  
                         </Form.Control.Feedback>                                                                   
                  </Form.Group>                                                                                
                                                                                                              
                  <Form.Group className="mb-3" controlId="password">                                           
                  <Form.Label>Contraseña</Form.Label>                                                                                  
                        <Form.Control                                                                        
                          isInvalid={formik.errors.pass && formik.touched.pass}  
                          name="pass"
                          onChange={formik.handleChange}
                          type="password"                                                           
                          placeholder="Ingrese Contraseña" />                                                                                                                                               
                        <Form.Control.Feedback type="invalid">                                                     
                          {formik.errors.pass}                                                                
                        </Form.Control.Feedback>                                                                  
                  </Form.Group>                                                                                                            
              
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" type="button"  onClick={showLoginModal} className="float-right">{props.buttonLogin}</Button>                  
                  <Controller control={control}                                                                
                  render={({ field: { ref }, formState }) => (                                               
                      <Button type="submit" disabled={formState.isSubmitting}                                  
                      className="btn btn-primary">                                                          
                      {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1" />}
                      {props.buttonOk}                                                                                  
                      </Button>                                                                                
                  )} />                                                                                      
              </Modal.Footer>
              </Form>
          </Modal>
      )                                                                                                
                                                                                                       
  }   
  
  function initialValues(){
    return{
        firstName: "",
        lastName: "",
        user: "",
        email: "",
        pass: "",
        admin: true
    }
  }

  function validationSchema(){
    return{
        firstName: yup.string().required(true),
        lastName: yup.string().required(true),
        user: yup.string().required(true),
        email: yup.string().email(true).required(true),
        pass: yup.string().required(true).min(8, 'La contraseña debe tener 8 caracteres')
    }
  }
       
                                                                                                     
export default SessionBarSignup;      