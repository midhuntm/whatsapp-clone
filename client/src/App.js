import React from "react";
import Login from "./Components/Login/Login";
import './App.css';
import {useStateValue} from './Components/ContextApi/StateProvider';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Chat from './Components/Chat/Chat';
import Sidebar from "./Components/Sidebar/Sidebar";
const App = () =>{
  const [{user}] = useStateValue();
return(
  
    <div className="app">
        { !user ? (
        <Login/>
      ) : (
        <div className="app_body"> 
          <Router>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Chat/>}/>
            <Route path="/rooms/:roomId" element={<Chat/>}/>
          </Routes>
          </Router>
          
        </div>  
      )}
    </div>
)
}

export default App;
//   <div className="app">
    //     { !user ? (
    //     <Login/>
    //   ) : (
    //     <div className="app_body"> 
    //       <Router>
    //       <Sidebar/>
    //     <Routes>
    //         <Route path="/" element={<Chat/>}/>
    //       <Route path="/rooms:/roomId" element={<Chat/>}/>
    //         </Routes>
    //       </Router>
          
    //     </div>  
    //   )}
    // </div>