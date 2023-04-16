import React, {useState, useEffect} from 'react'
import "../styles/Account.css"
import {Button} from "semantic-ui-react"
import { useHistory } from "react-router-dom"; 
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';

import AccountChangeName from '../components/AccountChangeName';
import AccountChangeEmail from '../components/AccountChangeEmail';
import AccountChangePassword from '../components/AccountChangePassword';

function Configuration(){
    return(
        <div className='account__configuration'>
            <div className='title'>Configuración</div>
            <div className='data'>Formularios de configuracion</div>
        </div>
    )
}

function Account() {
    const [user, setUser] = useState(undefined)
    const {auth, logout, setReloadUser} = useAuth()
    const history = useHistory();

    const handleClick = () => {
      history.push("/main");
    };

    useEffect(() => {
        (async() =>{
            const response = await getMeApi(logout)
            setUser(response || null)
        })()
    }, [auth])
    
    if(user === undefined) return null

    if(!auth && !user ){
        history.push("/");
        return null
    }

  return (
    <div className='w-100 bg-light'>
        <div className="container-fluid container-md">
            <AccountChangeName user={user} logout={logout}/>
            <AccountChangeEmail user={user} logout={logout} setReloadUser={setReloadUser}/>
            <AccountChangePassword user={user} logout={logout}/>
            
            <div className='row justify-content-center'>
                <div className='col-auto'>
                    <Button type='button' className="button-form before-button" onClick={handleClick}>Volver</Button>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Account;