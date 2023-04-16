import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { updateNameApi } from '../api/user'
import Swal from 'sweetalert2'

export default function AccountChangeName(props) {
    const {user, logout} = props
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(user.firstName, user.lastName),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
            setLoading(true)
            const response = await updateNameApi(user.id, formData, logout)
            if(!response){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar nombre y apellido'
                  })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Nombre y apellido actualizados'
                  })
            }
            setLoading(false)
        }
    })
    return(
        <Form onSubmit={formik.handleSubmit}>
            <div className='row'>
                <div className='col-12 mb-3'><h4>Cambia tu nombre y apellido</h4></div>
                <div className='col-12 col-md'>
                    <Form.Input name="firstName" 
                        placeholder="Tu nuevo nombre" 
                        onChange={formik.handleChange} 
                        value={formik.values.firstName} 
                        error={formik.errors.firstName}
                    />
                </div>
                <div className='col-12 col-md mt-3 mt-md-0'>
                    <Form.Input name="lastName" 
                        placeholder="Tu nuevo apellido" 
                        onChange={formik.handleChange} 
                        value={formik.values.lastName} 
                        error={formik.errors.lastName}
                    />
                </div>
            </div>
            
            <div className='row mt-3'>
                <div className='col'>
                    <Button className="submit button-form next-button  p-0" loading={loading}>Actualizar</Button>
                </div>
            </div>
        </Form>
    )
}

function initialValues(name, lastname){
    return {
        firstName: name || "",
        lastName: lastname || ""
    }
}

function validationSchema(){
    return {
        firstName: Yup.string().required(true),
        lastName: Yup.string().required(true)
    }
}