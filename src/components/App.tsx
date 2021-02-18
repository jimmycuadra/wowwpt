import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import './App.css';

import Login from "./Login";
import MythicKeystoneProfile from "./MythicKeystoneProfile";
import Nav from "./Nav";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <Router>
      <Route path="/">
        <Nav />
      </Route>
      <Route path="/login">
        {accessToken ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/">
        {accessToken ?
        <MythicKeystoneProfile region="us" realm="stonemaul" character="jibsy" namespace="profile-us" locale="en_US" accessToken={accessToken} />
        :
          <Redirect to="/login" />
        }
      </Route>
    </Router>
  );
}

export default App;
