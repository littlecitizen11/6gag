import React, {useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import CardComponent from "./CardComponent";
import {Container} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Row} from "react-bootstrap";
import AppBarComponent from "./AppBarComponent";


function Specific(props) {
    const [card,setCard] = React.useState("");

    useEffect(() => {
        const getRequest = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        (fetch('http://localhost:9090/api/meme/'+props.match.params.index, getRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                setCard(responseJson[0].item);
            })
            .catch((error) => {
                console.error(error);
            }));

    },[]);
/*

*/
    return (
        <Container className="Specific">
            <AppBarComponent/>
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
