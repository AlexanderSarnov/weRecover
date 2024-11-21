import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../services/authService';
import logo from '../assets/logo.png';
import userAvatar from '../assets/userAvatar.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="weRecover Logo" className="img-fluid" style={{ height: '50px' }} />
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ml-auto">
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
            </div>
        </Navbar>
    );
};

export default Header;
