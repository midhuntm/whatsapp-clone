import React, { useEffect, useState } from 'react'
import './Sidebar.css'; 
import { Avatar, IconButton } from '@mui/material';
import { useStateValue } from '../ContextApi/StateProvider';
import {Chat, DonutLarge, MoreVert, SearchOutlined} from '@mui/icons-material'
import SidebarChat from '../SidebarChat/SidebarChat';
import axios from 'axios';
import Pusher from 'pusher-js';
const app =[];
export default function Sidebar() {

  const [{user}] = useStateValue();
  const [rooms,setRooms] = useState([]);
  const [rooms2,setRooms2] = useState([]);
  const [filtered,setFiltered] = useState("");
  useEffect(() => {
    axios.get('http://localhost:5001/all/rooms')
    .then((response) => {
      setRooms(response.data);
  });
  },[]);

  useEffect(() => {
    const pusher = new Pusher('203446e6d6b484b23c77', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('room');
    channel.bind('inserted', function(room) {
      console.log(room);
      setRooms((prevRooms) => [...prevRooms,room]);
    });
  },[])

  
  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src={user.photoURL}/>
              <div className='sidebar_headerRight'>
                <IconButton>
                  <DonutLarge/>
                </IconButton>
                <IconButton>
                  <Chat/>
                </IconButton>
                <IconButton>
                  <MoreVert/>
                </IconButton>
              </div>
        </div>
          <div className='sidebar_search'>
            <div className='sidebar_searchContainer'>
              <SearchOutlined/>
              <input type="text" placeholder='Search or start new chat' onChange={(e) => setFiltered(e.target.value)}/>
            </div>
          </div>
       
          <SidebarChat addNewChat/>
              <div className='sidebar_chats'>   
             {
              rooms.filter((item) => {
                return filtered.toLowerCase() === '' ? item : item?.toLowerCase().includes(filtered)
              }).
              map((room) => (
                <SidebarChat key={room._id} id={room._id} name={room.name}/>
              ))
             }
              </div>
    </div>
  )
}
