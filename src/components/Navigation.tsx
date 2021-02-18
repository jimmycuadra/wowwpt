import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Navigation() {
  const accessToken = localStorage.getItem("accessToken");

  function handleLogOut(e: React.SyntheticEvent) {
    e.preventDefault();

    localStorage.removeItem("accessToken");

    window.location.reload();
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">World of Warcraft Alt Tracker</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {
          accessToken ?
          <Nav>
            <Nav.Item><Nav.Link href="#" onClick={handleLogOut}>Log out</Nav.Link></Nav.Item>
          </Nav>
          :
          <Nav>
            <Nav.Item><Nav.Link href="/login">Log in</Nav.Link></Nav.Item>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
