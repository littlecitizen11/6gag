import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import CardComponent from "./CardComponent";
import GenerateComponent from "./GenerateComponent";
import {Container} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {useAsync} from 'react-async';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



function Specific(props) {
    const [card,setCard] = React.useState("");

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        const getRequest = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        (fetch('http://localhost:9090/api/meme/'+props.match.params.index, getRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                setCard(responseJson[0].item);
                console.log("the card");
                console.log(card);
            })
            .catch((error) => {
                console.error(error);
            }));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    console.log(props.match.params.index);



    //const bla = loadUsers(props.match.index);

/*

*/
    return (
        <Container className="Specific">
            <Container fluid>
                <Row>
                    <Col>
                        <CardComponent guid={card.guid} index={card.index} user={card.user} liked={card.liked} author={card.author} title={card.title} dateUpload={card.dateUpload} image={card.image} bigDescription={card.story} description={card.description}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Specific;
