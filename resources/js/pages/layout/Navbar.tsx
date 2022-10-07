import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { APP_PREFIX } from '@/types/configurationType';
import NavLink from '@/components/NavLink';

export default () => {
    return (
        <Navbar collapseOnSelect expand="sm">
            <Container>
                <Navbar.Brand>Laravel Mailing Group System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={`/${APP_PREFIX}/list`} eventKey="1">List</Nav.Link>
                        <Nav.Link as={NavLink} to={`/${APP_PREFIX}/groups`} eventKey="2">Groups</Nav.Link>
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