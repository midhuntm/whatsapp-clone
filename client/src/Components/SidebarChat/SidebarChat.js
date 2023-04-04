import { Avatar } from '@mui/material';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import axios from 'axios';

export default function SidebarChat({addNewChat,name,id}) {
    const [seed,setSeed] = useState("");
    useEffect(() => {
    setSeed(Math.floor(Math.random()*5000))
    },[])

    const createChat = async() => {
      const roomName = prompt('Please enter name for the group')
      if(roomName){
        try{
          await axios.post('http://localhost:5001/group/create',{
            groupName : roomName,
          });   
          
        }
        catch(error){
            console.log(error);
        }
      }
    }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}>
        </Avatar>
        <div className='sidebarChat_info'>
              <h2>{name}</h2>
        </div>
    </div>
    </Link>
  ) : (
    <div className='sidebarChat' onClick={createChat}>
        <h2 >Add new Chat</h2>
    </div>
  )
}
