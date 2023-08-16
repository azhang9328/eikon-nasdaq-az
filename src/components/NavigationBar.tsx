import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import icon from '../../assets/icons/eikon_logo_small.png';

export default function NavigationBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={icon} alt="Eikon logo" className="nav-bar-logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
