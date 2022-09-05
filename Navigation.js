import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
  
  return (
    <Navbar bg="dark" variant = "dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">EcoLink</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/hostevent">Host an Event</Nav.Link>
            <Nav.Link href="#">Donate</Nav.Link>
            <Nav.Link href="#">Progress</Nav.Link>
            <Nav.Link href ="#"></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
