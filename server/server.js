const express = require('express');
const mongoose = require('mongoose');
const Rooms = require('./dbRooms');
const cors = require('cors');
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1560517",
    key: "203446e6d6b484b23c77",
    secret: "1428ac3d4d4fab6d4ce7",
    cluster: "ap2",
    useTLS: true
  });

  
const Messages = require('./dbMessages');
mongoose.set('strictQuery',false);
const app =express();
app.use(cors());
app.use(express.json());

const dbUrl = "mongodb+srv://MIDHUN:Midhun8940@student.8dkr6fs.mongodb.net/whatsappclone?retryWrites=true&w=majority"
mongoose.connect(dbUrl);
const db = mongoose.connection; 
db.once("open",()=>{
    console.log("db connected");
    const roomCollection = db.collection('rooms');
    const changeStream = roomCollection.watch();
    changeStream.on('change',(change) => {
        if(change.operationType === 'insert')
        {
            const roomDetails = change.fullDocument;
            pusher.trigger("rooms","inserted",roomDetails);
        }
        else
        {
            console.log('Not expected event to trigger');
        }
    })


    const msgCollection = db.collection('messages');
    const changeStream1 = msgCollection.watch();
    changeStream1.on('change',(change) => {
        if(change.operationType === 'insert')
        {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",messageDetails);
        }
        else
        {
            console.log('Not expected event to trigger');
        }
    })
})
app.get('/',(req,res) => {
    res.send('Hello From Back2');
})

app.post('/group/create',(req,res) => {
    const name = req.body.groupName;
    Rooms.create({name},(err,data) =>{  
        if(err) {
            return res.status(500).send(err);
        }
        else{
            return res.status(201).send(data);
        }   
    })
})

app.post('/messages/new',(req,res) => {
    const dbMessage = req.body; 
    Messages.create(dbMessage,(err,data) => {
        if(err)
        {
            return res.status(500).send(err);
        }
        else    
        {   
            return res.status(201).send(data);
        }
    })
})

app.get('/all/rooms',(req,res) => {
    Rooms.find({},(err,data) => {
        if(err) 
        {
            return res.status(500).send(err);
        }
        else
        {
            
            return res.status(200).send(data);
        }
    });
});

app.get('/room/:id',(req,res) => {
    Rooms.find({_id : req.params.id},(err,data) => {
        if(err)
        {
            return res.status(500).send(err);
        }
        else
        {
            return res.status(200).send(data[0]);
        }
    })
})

app.get('/messages/:id',(req,res) => {
    Messages.find({roomId : req.params.id},(err,data) => {
        if(err)
        {
            return res.status(500).send(err);
        }
        else
        {
            return res.status(200).send(data);
        }
    })
})
app.listen(5001,()=>{
    console.log('Server is Connected');
})