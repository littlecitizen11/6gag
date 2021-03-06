import React, {useEffect} from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import CardComponent from "./CardComponent";
import moment from "moment";
import 'react-images-upload'
import ImagesUploader from "react-images-uploader";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import AppBarComponent from "./AppBarComponent";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function GenerateComponent(props){
    const classes = useStyles();
    const [allCards,setAllCards] = React.useState([]);
    const [cards, setCard] = React.useState([]);
    const [user, setUser] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [story, setStory] = React.useState("");
    const [memeImages, setImages] = React.useState("");
    const [guidId, setGuid] = React.useState("");
    const [like, setLike]=React.useState(0);


    function addCard(e){
        e.preventDefault();
        let date= moment().format("DD-MM-YYYY hh:mm:ss");
        let newMeme ={
            guid:guidId,
            index:cards.length+1,
            user:user,
            author:user,
            title:title,
            dateUpload:date,
            image:memeImages,
            liked:0,
            description:description,
            story:story
        };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newMeme })
            };
        (fetch('http://localhost:9090/api/createMeme', requestOptions)
                .then((response) => response.json())
                .then((responseJson) => {
                    newMeme.guid=responseJson.meme;
                    setGuid(responseJson.meme);
                })
                .catch((error) => {
                    console.error(error);
                }));
        const newCard = [...cards, newMeme ];
        setCard(newCard);
    }


    useEffect(() => {
        const getRequest = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        (fetch('http://localhost:9090/api/allMeme', getRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                setAllCards(responseJson);
            })
            .catch((error) => {
                console.error(error);
            }));

    }, [cards, like]);

    function AddLike(guid, liked){
        let updateElement ={
            guid:guid,
            liked:liked,
        };
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                updateElement })
        };
        (fetch('http://localhost:9090/api/updateMeme', requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                setLike(responseJson);
            })
            .catch((error) => {
                console.error(error);
            }));
    }

    return(

        <Container>
        <AppBarComponent/>
        <Container fluid>
            <Row>
                {allCards.map((card, index) => (
                    <Col>
                        <CardComponent onLike={AddLike} guid={card.item.guid} index={card.item.index} user={card.item.user} liked={card.item.liked} author={card.item.author} title={card.item.title} dateUpload={card.item.dateUpload} image={card.item.image} bigDescription={card.item.story} description={card.item.description}/>
                    </Col>
                ))}
            </Row>
        </Container>
<Container fluid>
    <Row className="justify-content-md-center">
        <Form>
            <h1>Enter Memes Man</h1>
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
            <Button variant="contained" color="primary" className={classes.button} onClick={addCard}>
                Send
                <SendIcon className={classes.rightIcon} />
            </Button>

        </Form>
    </Row>
</Container>
        </Container>
    )
}
export default GenerateComponent;