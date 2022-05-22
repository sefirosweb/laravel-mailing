
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Laravel Mailing Group System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/${APP_PREFIX}/list`}>List</Nav.Link>
                        <Nav.Link as={Link} to={`/${APP_PREFIX}/groups`}>Groups</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href='/'>Go Main</Nav.Link>
                        <Nav.Link target="_blank" href='https://github.com/sefirosweb/laravel-mailing'>GIT HUB</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar