import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../services/authService';
import logo from '../assets/logo.png';
import userAvatar from '../assets/userAvatar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included

const Header = () => {
    return (
        <Navbar bg="light" expand="lg" className="w-100">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand className="d-flex align-items-center">
                        <img src={logo} alt="weRecover Logo" className="img-fluid" style={{ height: '50px' }} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav" className="justify-content-between">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/steps">
                            <Nav.Link>Steps</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/progress">
                            <Nav.Link>Progress</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/settings">
                            <Nav.Link>Settings</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={
                                <img
                                    src={userAvatar}
                                    alt="User Avatar"
                                    className="rounded-circle"
                                    style={{ height: '40px', cursor: 'pointer' }}
                                />
                            }
                            id="userAvatarDropdown">
                            <LinkContainer to="/profile">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
