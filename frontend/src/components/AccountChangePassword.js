import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react"
import { useFormik } from 'formik'
import * as Yup from "yup"
import Swal from 'sweetalert2'
import { updatePasswordApi } from '../api/user'

export default function AccountChangePassword(props) {
    const {user, logout} = props
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
            setLoading(true)
            const response = await updatePasswordApi(user.id, formData.pass, logout)
            if(!response){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar contraseña'
                  })
            }else{
                logout()
            }
            setLoading(false)
        }
    })
    return(
        <Form onSubmit={formik.handleSubmit}>
            <div className='row mt-3'>
                <div className='col-12 mb-3'><h4>Cambiar tu contraseña</h4></div>
                <div className='col-12 col-md'>
                    <Form.Input name="pass" 
                        type="password" 
                        placeholder="Tu nueva contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.pass}
                        error={formik.errors.pass}
                    />
                </div>
                <div className='col-12 col-md mt-3 mt-md-0'>
                    <Form.Input name="repeatPassword" 
                        type="password" 
                        placeholder="Confirma tu nueva contraseña"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </div>
            </div>
            
            <div className='row mt-3'>
                <div className='col'>
                    <Button className="submit button-form next-button p-0" loading={loading}>Actualizar</Button>
                </div>
            </div>
        </Form>
    )
}

function initialValues(){
    return {
        pass:  "",
        repeatPassword:  ""
    }
}

function validationSchema(){
    return {
        pass: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")], true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("pass")], true)
    }
}