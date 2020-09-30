import React, {useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import CardComponent from "./CardComponent";
import GenerateComponent from "./GenerateComponent";
import {Container} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




function Specific(props) {
    console.log(props.match.params)
    return (
        <Container className="Specific">
            <Container fluid>
                <Row>
                    <h1>Working</h1>
                </Row>
            </Container>
        </Container>
    );
}

export default Specific;
