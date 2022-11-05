import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './images/logo_mvc.png';

function NavbarTop() {
  return (
    <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Text>Sorteos</Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default NavbarTop;