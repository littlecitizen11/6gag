import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import CardComponent from "./CardComponent";

import GenerateComponent from "./GenerateComponent";
import {Container} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Specific from "./Specific";

function App() {

  return (
    <Container className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={GenerateComponent}></Route>
        <Route path="/specific/:index" component={Specific}></Route>
      </Switch>
      </Router>
    </Container>
  );
}

export default App;
