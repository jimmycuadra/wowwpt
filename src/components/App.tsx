import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import './App.css';

import Login from "./Login";
import CharacterMythicKeystoneProfileIndex from "./CharacterMythicKeystoneProfileIndex";
import Navigation from "./Navigation";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const region = localStorage.getItem("region") || "us";
  const locale = localStorage.getItem("locale") || "en_US";

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
            <CharacterMythicKeystoneProfileIndex region={region} realm="stonemaul" characterName="jibsy" namespace={`profile-${region}`} locale={locale} accessToken={accessToken} />
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
