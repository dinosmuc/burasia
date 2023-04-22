import { Outlet, Link } from "react-router-dom";
import { Fragment, useState } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./navigation.style.css";

function Navigation({ onLogout }) {
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        expanded={expanded}
        className="custom-navbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}>
            BORASIA
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/customer-list" onClick={handleLinkClick}>
                Customer List
              </Nav.Link>
              <Nav.Link as={Link} to="/schedule" onClick={handleLinkClick}>
                Schedule
              </Nav.Link>
              <Nav.Link as={Link} to="/account" onClick={handleLinkClick}>
                Account
              </Nav.Link>
              <Nav.Link as={Link} to="/" onClick={onLogout}>
                Log-out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;