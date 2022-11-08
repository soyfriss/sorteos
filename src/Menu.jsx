import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo_mvc.png';

function Menu() {
  return (
    <Navbar bg="light" variant="light" className="logo-font">
      <Container>
        <Navbar.Text><h2>SORTEOS</h2></Navbar.Text>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Menu;