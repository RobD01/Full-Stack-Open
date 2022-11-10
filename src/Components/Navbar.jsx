import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/Full-Stack-Open/">Full Stack Open</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Full-Stack-Open/">Home</Nav.Link>
            <Nav.Link href="/Full-Stack-Open/#/courselist">
              Course List
            </Nav.Link>
            <Nav.Link href="/Full-Stack-Open/#/phonebook">Phone Book</Nav.Link>
            <Nav.Link href="/Full-Stack-Open/#/country">Country</Nav.Link>
            <Nav.Link href="/Full-Stack-Open/#/resources">Resources</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
