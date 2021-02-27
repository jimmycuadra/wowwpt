import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CharacterProgress from "./CharacterProgress";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

function App() {
  return (
    <>
      <Navigation />
      <div className="p-sm-4">
        <Container fluid>
          <Row>
            <Col xl={2}>
              <Sidebar />
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
