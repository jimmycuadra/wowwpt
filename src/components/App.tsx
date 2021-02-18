import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './App.css';

import Login from "./Login";
import MythicKeystoneProfile from "./MythicKeystoneProfile";
import Navigation from "./Navigation";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Router>
      <Route path="/">
        <Navigation />
      </Route>
      <Route path="/login">
        {accessToken ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/">
        <div className="body">
          <Container fluid>
            {accessToken ?
            <MythicKeystoneProfile region="us" realm="stonemaul" characterName="jibsy" namespace="profile-us" locale="en_US" accessToken={accessToken} />
            :
              <Redirect to="/login" />
            }
          </Container>
        </div>
      </Route>
    </Router>
  );
}

export default App;
