/*
const storageapi = require('./InMemory/index');
*/
import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
const fs = require('fs');
const path = require('path');

const app = express();

app.use('/static', express.static('./server/static'));

app.use(corsPrefetch);

app.post('/notmultiple', imagesUpload(
    './server/static/files',
    'http://localhost:9090/static/files'
));



app.listen(9090, () => {
    console.log('Listen: 9090');
});


/*



const users={};

app.listen(3000, () => {
    console.log("start listening")
});

const storage = new storageapi.InMemoryStorage();

app.get('/api/users/:userId', (req,res)=>{

    const foundUser=storage.find('users', req.params.userId);
    res.status(200).send(foundUser);
});
app.post('/api/creatUsers', (req,res,next)=>{
    const user = storage.create('users',{username: req.body.userId ,password:req.body.pass});
    if(!user){
        next(new Error('no user'));
    }
    else
        res.status(200).send(user);
});*/
