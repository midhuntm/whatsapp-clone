import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Chat.css';
import {useStateValue} from "../ContextApi/StateProvider"
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
export default function Chat() {
  const [seed,setSeed] = useState("");

  useEffect(() => {
  setSeed(Math.floor(Math.random()*5000))
  },[])
  const [input,setInput] =useState('');
  const [roomName,setRoomName] = useState("");
  const [updatedAt,setUpdatedAt] = useState("");
  const [messages,setMessages] = useState([]);
  const [{user}] = useStateValue();
  const {roomId} = useParams()
  
  useEffect(() => {
    if(roomId)
    {
      axios.get(`http://localhost:5001/room/${roomId}`)
      .then((response) => {
      setRoomName(response.data.name) 
      setUpdatedAt(response.data.updatedAt)
      });
      console.log(updatedAt,'updateAt');
      
      axios.get(`http://localhost:5001/messages/${roomId}`)
      .then((response) => {setMessages(response.data)})
    }
  },[roomId])

  useEffect(() => {
    const pusher = new Pusher('203446e6d6b484b23c77', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(message) {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages,message]);
    });
  },[])


  const sendMessage = async(e) =>{
    e.preventDefault();
    console.log(input);
    if(!input) {
      return;
    }
   
    await axios.post('http://localhost:5001/messages/new',{
      message : input,
      name : user.displayName,
      time : new Date(),
      uid : user.uid,
      roomId : roomId
    })
    setInput('');
  }
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className='chat_headerInfo'>
            <h3>{roomName ? roomName : 'welcome to whatsapp'}</h3>
            <p>{updatedAt ? `Last updated at ${new Date(updatedAt).toString().slice(0,25)}` : "Click on any group"}</p>
        </div>

            <div className='chat_headerRight'>
              <IconButton>
                <SearchOutlined/>
              </IconButton>
              <IconButton>
                <AttachFile/>
              </IconButton>
              <IconButton>
                <MoreVert/>
              </IconButton>
             </div>
      </div>
              <div className='chat_body'>
                {messages.map((message,index) =>(

                <p className={`chat_message ${message.uid === user.uid && "chat_receiver"}`} key={index}>
                  <span className='chat_name'>{message.name}</span>
                  {message.message}
                  <span className='chat_timeStamp'>{new Date(message.timestamp).toString().slice(0,25)}</span>
                  </p>
                ))}
              </div>
                 {roomName &&
                   <div className='chat_footer'>
                    <InsertEmoticon/>
                    <form>
                      <input placeholder='type a message' onChange={(e) => setInput(e.target.value)} value={input}/>
                      <button onClick={sendMessage}>Send a messagae</button>
                    </form>
                  </div>
                 }
    </div>
  )
}
