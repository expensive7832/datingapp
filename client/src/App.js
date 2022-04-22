import React, { useEffect, useState } from 'react'
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import Home from "./Pages/Home.js";
import UpdateUser from "./Pages/UpdateUser.js";
import DeleteUser from "./Pages/DeleteUser.js";
import Login from "./Pages/Login.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Match from './Pages/Match.js';
import { CssBaseline } from '@material-ui/core';
import 'animate.css';
import Pricing from './components/Pricing.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/Chat.js';
import Axios from 'axios';


const App = () => {

  const [friends, setFriends] = useState(null)

  const user = JSON?.parse(localStorage?.getItem('userData'))

  const getUserFriends = async() =>{
    await Axios?.post('/getFriendList',{
      id: user?._id
    }).then((res) => {
      setFriends(res?.data?.friendList)
    })
  }

 
  
  

  useEffect(() =>{

     getUserFriends()

     return () =>{
      getUserFriends()
     }
  }, [user])


  return (
    <div id="tinder">
     
     <CssBaseline/>
     <ToastContainer/>  
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ user ? <Home friendList={friends} /> : <Landing/>} />
        <Route path="/login" element={ <Login/> } />
        <Route path="/registration" element={ <SignUp/> } />
        <Route path="/match/:loginId/:swipeId" element={ <Match /> } />
        <Route path="/pricing" element={ <Pricing/> } />
        <Route path="/chat/:id" element={ <Chat /> } />
        <Route path="/update/:userId" element={ <UpdateUser/> } />
        <Route path="/delete/:userId" element={ <DeleteUser/> } />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

