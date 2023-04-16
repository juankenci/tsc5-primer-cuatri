import React from "react";
import {Form, Button} from 'react-bootstrap';                                            
import { useForm, Controller } from "react-hook-form";               
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';

                                                                                             
function SessionBarLogin(props) {      
    const {showSignupModal, login} = props                                                                 
    const { control, reset} = useForm()                        

    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: (formData) => {
            login(formData)
        }
    })
      
    const resetPassword = () =>{
        
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
                          Login
                  </Modal.Title>
              </Modal.Header>
              <Form onSubmit={formik.handleSubmit} onReset={reset} >                                        
              <Modal.Body>
                  
                  <Form.Group className="mb-3" controlId="formUsername">                                       
                  <Form.Label>Usuario</Form.Label>                                                                                   
                        <Form.Control                         
                          isInvalid={formik.errors.user && formik.touched.user}  
                          name="user"
                          onChange={formik.handleChange}
                          type="text"                                                        
                          placeholder="Ingrese Usuario" />                                                
                        <Form.Control.Feedback type="invalid">                                                     
                            {formik.errors.user}                                                               
                        </Form.Control.Feedback>                                                                   
                  </Form.Group>                                                                                
                                                                                                                                                                                                                          
                  <Form.Group className="mb-3" controlId="password">                                           
                  <Form.Label>Contraseña</Form.Label>                                                          
                        <Form.Control                                                                        
                          onChange={formik.handleChange}
                          name="pass"
                          type="password"                          
                          isInvalid={formik.errors.pass && formik.touched.pass}
                          placeholder="Ingrese Contraseña" />                                                                                                                                      
                        <Form.Control.Feedback type="invalid">                                                     
                            {formik.errors.pass}                                            
                        </Form.Control.Feedback>                                                                   
                  </Form.Group>                                                                              
                  <Button variant="link" type="button" onClick={resetPassword} lassname="float-right">Has olvidado la contraseña?</Button>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" type="button"  onClick={showSignupModal} lassname="float-right">{props.buttonRegistrar}</Button>                  
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
          user: "",
          pass: ""
      }
  }


  function validationSchema(){
      return{
        user: yup.string().required(true),
        pass: yup.string().required(true).min(8, 'La contraseña debe tener 8 caracteres')
      }
  }
                                                                                                     
export default SessionBarLogin;      