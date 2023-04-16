
import imagen_index from "../assets/imagen_index.png";
import compass from "../assets/compass.jpg";
import undav from "../assets/undav.jpg";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LandingCarrousel from "./LandingCarrousel"
import LandingArrowTop from "./LandingArrowTop"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

const LandingContent = () => {
  const {auth} = useAuth();



  const ButtonIngreso = () => {
    return(
      <Link to="/upload">
        <Button variant='success' >
          Ingresar al Formulario
        </Button>
      </Link>
    )  
  }
  const ButtonIngresoDisabled = () => {
    return(
      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Inicia sesion para continuar!</Tooltip>}>
          <span className="d-inline-block">
            <Button variant="secondary" disabled style={{ pointerEvents: 'none' }}>Ingresar al Formulario</Button>
            </span>
      </OverlayTrigger>
    )  
  }

  return (
    <>
     {/*<LandingCarrousel /> */}
  
     <div id="proyecto" className="rowCustom">
      <div className="colCustom text">
        <h1>Mapa de la Economía Popular</h1>
        <br /> <br />
        La creación de un nuevo concepto para organizar la producción y los servicios – la economía popular – no es fruto de
        una moda o una rebeldía fundamentalista. Surge por el fracaso del capitalismo orientado por el lucro, que no puede
        asegurar un futuro de mínima dignidad para todos los ciudadanos. <br /><br />
        El capitalismo con rostro humano, las exhortaciones éticas o morales, la responsabilidad social empresaria, terminan
        siendo placebos calma conciencia, o peor: engaña conciencias. No puede ser de otra manera en un sistema que
        concentra poder y patrimonio y como concentra, excluye.<br /><br />
        Tal motivo fue uno de los motores para la creacion de este proyecto donde tenemos como objetivo crear redes y reconocernos entre todos los integrantes del territorrio
        <br /> <br />
        <div className="content-button">  
            <Link to="/Map">
                <Button variant='success' >
                  Explorar Mapeo
                </Button> 
            </Link>
            </div>
      </div>
      <div className="colCustom imgAnimacion">
        <img alt="Logo index" src={imagen_index} />
      </div>
    </div>

    <hr className="divider"/>
    <div id="universidad" className="rowCustom">
      
      <div className="colCustom imgAnimacion">
        <img alt="Logo index" src={undav} />
      </div>
      <div className="colCustom text">
        <h1>Desarollado por UNDAV</h1>
        <br /> <br />
          Este proyecto fue desarollado por estudiantes de la carrera de Ingenieria en Informatica de la 
          Universidad Nacional de Avellaneda - UNDAV -.
          <br /><br />
          Este proyecto es uno de los tantos proyectos que se llevan a cabo en la universidad, 
          la cual tiene un trayecto curricular llamado Trabajo Social Comunitario donde se busca que la 
          universidad eche raizes en el territorio, para asi completar la formacion profesional con conocimientos populares
          <br /> <br />
        
  
      </div>
    </div>

    <hr className="divider"/>

    <div id="formulario" className="rowCustom">
      <div className="colCustom text">
        <h1>¡¡Sumate!!</h1>
        <br /> <br />
          Para sumar su organizacion al proyecto de mapeo de la economia Popular puede ingresar los datos a travez del siguiente formulario, 
          recuerde que previamente debe haber iniciado session desde el sector de arriba a la derecha <br />
          <br /> <br />
        <div className="content-button"> {auth ? <ButtonIngreso/> : <ButtonIngresoDisabled />  }  </div>
      </div>
      <div className="colCustom imgAnimacion">
        <img alt="Logo index" src={compass} />
      </div>
    </div>
    
    <LandingArrowTop />
    </>

   
  );
};

export default LandingContent;
