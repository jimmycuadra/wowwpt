import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";

import CharacterProgress from "./CharacterProgress";
import CharacterSelect from "./CharacterSelect";
import Navigation from "./Navigation";

function App() {
  return (
    <>
      <Navigation />
      <div className="body">
        <Container fluid>
          <Row>
            <Col xl={2}>
              <CharacterSelect />
            </Col>
            <Col>
              <CharacterProgress />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
