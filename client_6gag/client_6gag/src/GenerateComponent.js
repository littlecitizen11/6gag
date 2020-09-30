import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CardComponent from "./CardComponent";

function GenerateComponent(props){
    const [cards, setCard] = React.useState([]);

    let card1 ={
        user:"this is user",
        author:"this is author",
        title:"this is title",
        dateUpload:"uploaded",
        image:"",
        liked:"1",
        description:"description"
    };

    function addCard(){
        console.log(...cards);
        const newCard = [...cards, card1 ];
        setCard(newCard);
    }

    function onClickImage(index){
        console.log(index);
        return(
            <Row>
                <Col>
                    <CardComponent key={index} index={index} user="bla" liked="0" author="me" onClickImage={onClickImage} title="title" dateUpload="this is a date" image="" description="this is description"/>
                </Col>
            </Row>
        )
    }

    console.log(props);
    return(
        <Container>
        <Container fluid>
            <Row>
                {cards.map((card, index) => (
                    <Col>
                        <CardComponent key={index} index={index} user="bla" liked="0" author="me" onClickImage={onClickImage} title="title" dateUpload="this is a date" image="" description="this is description"/>
                    </Col>
                ))}
            </Row>
        </Container>

    <div className="row">
        <button onClick={addCard}>Hello</button>
    </div>
        </Container>
    )
}
export default GenerateComponent;