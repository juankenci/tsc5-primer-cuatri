import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import { updateEmailApi } from '../api/user'
import Swal from 'sweetalert2'

export default function AccountChangeEmail(props) {
    const { user, logout, setReloadUser} = props

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
            setLoading(true)
            const response = await updateEmailApi(user.id, formData.email, logout)
            const result = JSON.stringify(response)
            if(result.includes("invalid")){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar mail'
                  })
            }
            else{
                setReloadUser(true)
                Swal.fire({
                    icon: 'success',
                    title: 'Email actualizado'
                  })
                formik.handleReset()
            }
            setLoading(false)
        }
    })

    return(
        <Form onSubmit={formik.handleSubmit}>
            <div className='row mt-3'>
                <div className='col-12 mb-3'><h4>Cambia el email <span>(Tu email actual: {user.email}) </span></h4> </div>
                <div className='col-12 col-md'>
                    <Form.Input name="email" 
                        placeholder="Tu nuevo email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                </div>
                <div className='col-12 col-md mt-3 mt-md-0'>
                    <Form.Input name="repeatEmail" 
                        placeholder="Confirma tu nuevo email"
                        onChange={formik.handleChange}
                        value={formik.values.repeatEmail}
                        error={formik.errors.repeatEmail}
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

function initialValues(){
    return {
        email: "",
        repeatEmail: ""
    }
}

function validationSchema(){
    return {
        email: Yup.string().email(true).required(true).oneOf([Yup.ref("repeatEmail")], true),
        repeatEmail: Yup.string().email(true).required(true).oneOf([Yup.ref("email")], true)
    }
}
