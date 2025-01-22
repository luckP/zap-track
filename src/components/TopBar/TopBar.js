import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import { Container, Navbar, Form, Button } from "react-bootstrap";

function TopBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="">
      <Container>
        <Navbar.Brand href="#">Zapp Track</Navbar.Brand>
        <Form className="d-flex ms-auto">
          <Form.Control
            type="search"
            placeholder="Search area..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Form>
              <Button variant="primary" className="ms-3">
                <FontAwesomeIcon icon={faUser} /> 
                </Button>
      </Container>
    </Navbar>
  );
}

export default TopBar;



