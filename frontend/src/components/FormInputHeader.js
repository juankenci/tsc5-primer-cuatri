import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import undavLogo from "../assets/undav_header_logo.png";

import "../styles/FormInputHeader.css";

const FormInputHeader = () => {
  const history = useHistory();

  const handleLogOut = () => {
    history.push("/main");
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img alt="" src={undavLogo} width="100" height="50" />
          Economia Popular
        </Navbar.Brand>
        <div className="header-left-content">
          <Nav className="mr-auto">
            <Button className="text-success" variant="link" size="sm">
              Formulario
            </Button>
          </Nav>
        </div>
        <div className="header-right-content">
          <Nav className="mr-sm-2">
            <Button
              className="text-danger"
              variant="link"
              size="sm"
              onClick={handleLogOut}
            >
              Salir
            </Button>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

export default FormInputHeader;
