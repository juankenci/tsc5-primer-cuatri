import { Button } from "react-bootstrap";
import SessionBarLogin from "./SessionBarLogin";
import SessionBarSignup from "./SessionBarSignup";
import SessionBarMessage from "./SessionBarMessage";
import {useState } from 'react';
import axios from '../Helpers/API'; 
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router-dom";  
import {Icon} from "semantic-ui-react"

const SessionBar = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageText, setMessageText] = useState('');
  const {auth, login, logout} = useAuth();
  const history = useHistory();
  

  const myAccount = (event) => {
    history.push("/account");
  };


  const ButtonsAuth = () => {
    return(
      <>
        <Button variant="info" onClick={showSignupModal} id="account-button">
          Registrarme
        </Button>
        <Button variant="info" onClick={showLoginModal} id="account-button">
          Iniciar Sesión
        </Button> 
      </>
    )
  }

  const ButtonAccount = () => {
    return (
    <>
      <Button variant="info"  onClick={myAccount} id="account-button">
        <Icon name='user outline'/>
        Mi cuenta
      </Button> 
      <Button variant="danger" onClick={logout} id="close-session">
        <Icon name='power off'/>
        Cerrar sesion
      </Button>    
    </>

    )
  }
  
  const showLoginModal = () => {    
    setLoginModal(true);
    setSignupModal(false);
  };

  const showSignupModal = () => {    
    setSignupModal(true);
    setLoginModal(false);
  };

  const hideLoginModal = () => {    
    setLoginModal(false);
  };

  const hideSignupModal = () => {    
    setSignupModal(false);
  };

  const showMessageModal = () => {    
    setMessageModal(true);
  };
  const hideMessageModal = () => {    
    setMessageModal(false);
  };

  const loginForm= (data) => {
    return axios.post('/login', data)                                                        
    .then(result => {   
        var json = result.data                                                                            
        hideLoginModal()                                                
        if (typeof(json.token) != 'undefined'){
            login(json.token) 
            localStorage.setItem('token',json.token)
            hideMessageModal()       
        }   
    })                                                                                               
    .catch(error => {
        hideLoginModal()                                                
        setMessageTitle("Error");
        setMessageText("Credenciales no válidas")
        showMessageModal()
    })
  }
             
  return (    
    <div className="sessionBar-container" >
      <SessionBarLogin
          show={loginModal}
          onHide={hideLoginModal} 
          buttonOk="Iniciar Sesión"
          buttonRegistrar="Registrarse"
          login= {loginForm}
          showMessage = {showMessageModal}
          setMessageTitle = {setMessageTitle}
          hideMessageModal = {hideMessageModal}
          setMessageText = {setMessageText}
          showSignupModal= {showSignupModal}
      />
      <SessionBarSignup
          show={signupModal}
          onHide={hideSignupModal} 
          buttonOk="Registrarse"
          buttonLogin="Iniciar Sesión" 
          login= {loginForm}     
          showMessage = {showMessageModal}
          showLoginModal = {showLoginModal}
          setMessageTitle = {setMessageTitle}
          setMessageText = {setMessageText}
      />

    <SessionBarMessage
          show={messageModal}
          title = {messageTitle}
          text = {messageText}
          messageTitle={messageTitle}     
          onHide={hideMessageModal} 
          buttonOk="OK"
      />


      <div>
        {auth ? <ButtonAccount/> : <ButtonsAuth/>}
      </div>
    </div>
  );
};

export default SessionBar;
