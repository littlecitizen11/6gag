/*
const storageapi = require('./InMemory/index');
*/
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import {InMemoryStorage} from "./InMemory";
import * as bodyParser from "body-parser";
const fs = require('fs');
const path = require('path');

const app = express();

app.use('/static', express.static('./server/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(function(err,req,res,next){
    console.log('Error');
    res.status(400).send('Error');});
app.use(corsPrefetch);

app.post('/notmultiple', imagesUpload(
    './server/static/files',
    'http://localhost:9090/static/files'
));

const storage = new InMemoryStorage();

app.get('/api/meme/:memeId', (req,res)=>{

    const foundMeme=storage.find('memes', req.params.memeId);
    console.log(foundMeme);
    res.status(200).send(foundMeme);
});

app.get('/api/allMeme', (req,res)=>{
    const foundMeme=storage.all('memes');
    console.log(foundMeme);
    res.status(200).send(foundMeme);
});

app.post('/api/createMeme', (req,res,next)=>{
    const meme = storage.create('memes',{
        guid:req.body.newMeme.guid,
        index:req.body.newMeme.index,
        user:req.body.newMeme.user,
        author:req.body.newMeme.author,
        title:req.body.newMeme.title,
        dateUpload:req.body.newMeme.dateUpload,
        image:req.body.newMeme.image,
        liked:req.body.newMeme.liked,
        description:req.body.newMeme.description,
        story:req.body.newMeme.story});
    if(!meme){
        console.log("there is no meme");
        next(new Error('no meme'));
    }
    else
    {
        res.status(200).send({meme});
    }
});


app.listen(9090, () => {
    console.log('Listen: 9090');
});