import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useAppDispatch } from "../redux/store";
import { clearAllData } from "../redux/characters";

export default function Navigation() {
  const dispatch = useAppDispatch();

  function handleClearAllData() {
    if (window.confirm("Are you sure you want to clear all data?")) {
      dispatch(clearAllData());
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>World of Warcraft Weekly Progress Tracker</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Item>
            <Button variant="danger" onClick={handleClearAllData}>Clear All Data</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
