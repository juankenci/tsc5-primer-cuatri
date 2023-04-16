import mepLogo from "../assets/mep.png";
import SessionBar from "./SessionBar";
import '../styles/Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from 'react-router-dom';


function NavScrollExample() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link to="/"><Navbar.Brand ><img src={mepLogo} alt="" className={"header-logo"} /></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="main#proyecto">PROYECTO</Nav.Link>
            <Nav.Link href="main#universidad">UNIVERSIDAD</Nav.Link>
            <Nav.Link href="main#formulario">FORMULARIO</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <SessionBar />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

/*
const Header = () => {
  return (
    <div>
      <div className="header-container">
        <img src={mepLogo} alt="" className={"header-logo"} />
        <div className="header-navigation-items">
          <div>SOBRE EL PROYECTO</div>
          <div>LA UNIVERSIDAD</div>
          <div>CONTACTO</div>
          <div><SessionBar /></div>

        </div>
      </div>
      <hr className="header-divider"/>
    </div>
  );
};

export default Header;
*/
