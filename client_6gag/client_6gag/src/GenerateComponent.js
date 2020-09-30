import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import CardComponent from "./CardComponent";
import moment from "moment";
import 'react-images-upload'
import ImagesUploader from "react-images-uploader";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

function GenerateComponent(props){
    const [cards, setCard] = React.useState([]);
    const [user, setUser] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [story, setStory] = React.useState("");
    const [memeImages, setImages] = React.useState("");
    const maxNumber = 1;





    function addCard(e){
        e.preventDefault();
        console.log(memeImages);
        let card1 ={
            user:user,
            author:user,
            title:title,
            dateUpload:moment().format("DD-MM-YYYY hh:mm:ss"),
            image:memeImages,
            liked:"0",
            description:description,
            story:story
        };
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

    return(
        <Container>
        <Container fluid>
            <Row>
                {cards.map((card, index) => (
                    <Col>
                        <CardComponent key={index} index={index} user={card.user} liked={card.liked} author={card.author} onClickImage={onClickImage} title={card.title} dateUpload={card.dateUpload} image={card.image} bigDescription={card.story} description={card.description}/>
                    </Col>
                ))}
            </Row>
        </Container>
<Container>
    <Row>
        <Form>
{/*
            <CardComponent key={index} index={index} user="bla" liked="0" author="me" onClickImage={onClickImage} title="title" dateUpload="this is a date" image="" description="this is description"/>
*/}

            <Form.Group controlId="formBasicUser">
                <Form.Label>User</Form.Label>
                <Form.Control type="text" placeholder="Enter user" onChange={e => setUser(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Meme Title" onChange={e => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Meme Description" onChange={e => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicStoryDescription">
                <Form.Label>Story Description</Form.Label>
                <Form.Control type="text" placeholder="Meme Story Description" onChange={e => setStory(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicUploadImage">
                <ImagesUploader
                    url="http://localhost:9090/notmultiple"
                    optimisticPreviews
                    multiple={false}
                    onLoadEnd={(err, response) => {
                        if (err) {
                            console.error(err);
                        }
                        else{
                            {setImages(response)}
                        }
                    }}
                    label="Upload a Meme"
                />

            </Form.Group>
            <button onClick={addCard}>Hello</button>
        </Form>
    </Row>
</Container>
        </Container>
    )
}
export default GenerateComponent;