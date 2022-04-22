import React, { useState, useEffect, useRef } from "react";
import "./match.css";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@mui/icons-material/Home";
import { Stack } from "@mui/material";
import { Button, TextField } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import Tindercard from "./../Pages/Tindercard";
import ChatTab from "./ChatTab";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "@material-ui/core";


const Match = ({friendList}) => {

  const loginUser = JSON?.parse(localStorage?.getItem("userData"));



const [loginData, setLoginData] = useState(null);
  const [swipeData, setSwipeData] = useState(null);


  const { loginId } = useParams();
  const { swipeId } = useParams();

  const navigate = useNavigate()


  const getSwipeUSer = async() =>{
    await Axios.post('/clickUser', {
          clickId: swipeId
     }).then((res) => (
         setSwipeData(res?.data?.user)
     )).catch((err) => {
       console.log(err)  
     });
 }

  useEffect(() =>{

    getSwipeUSer()

  }, [loginId, swipeId])

  const [selectTab, setSelectTab] = useState(10);

  const handleTabSelect = (event, newValue) => {
    setSelectTab(newValue);
  };

  const [im, setIm] = useState("");

  

  const sendMessage = async() =>{
    Axios.post("/message/", {
      swipeId: swipeId,
      loginId: loginId,
      message: im
    })
      .then((res) => {
       if(res?.data?.msg === "newchat"){
        toast.success("You initiated the conversation!!!")
        return navigate("./../../../")
       } 
      })
      .catch((e) => {
        console.log(e.message);
      });

      setIm("")
  }

  return (
    
    <div id="match">
      <Grid
        className="topBar"
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={0} md={2} item />

        <Grid xs={12} md={8} item>
          <Box
            style={{
              backgroundColor: "#FF5345",
              height: "30vh",
              padding: "3rem 0",
            }}
          >
            <Tabs
              value={selectTab}
              onChange={handleTabSelect}
              aria-label="icon menu"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab icon={<Person />} disabled={true} />
              <Link to="./../../../">
                <Tab icon={<HomeIcon />} />
              </Link>
              <Tab icon={<Chat />} />
            </Tabs>
          </Box>
          <div class="custom-shape-divider-bottom-1647547021">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>

          {selectTab === 2 ? (
            <ChatTab data={friendList} />
            
          ) : (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid xs={0} md={2} item />

              <Grid xs={12} md={8} item>
                <Grid
                  container
                  className="matchdesign"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid style={{ alignSelf: "start" }} item xs={5}>
                    <Avatar src={loginUser?.photo} alt="login user" />
                  </Grid>
                  <Grid item xs={2}>
                    <p className="animate__animated animate__fadeIn animate__repeat-2 animate__slow">
                      Match
                    </p>
                  </Grid>
                  <Grid item style={{ alignSelf: "flex-end" }} xs={5}>
                    <Avatar src={swipeData?.photo} alt="swipe user" />
                  </Grid>
                </Grid>
              </Grid>

              <Grid xs={0} md={2} item />
            </Grid>
          )}
        </Grid>

        <Grid xs={0} md={2} item />
      </Grid>
      <Grid container>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{
              width: "100%",
              height: "10vh",
              position: "fixed",
              bottom: "0",
            }}
          >
            <Grid xs={10} sm={9} item>
              <TextField
                fullWidth
                id="filled-basic"
                name="imessage"
                value={im}
                onChange={(e) => setIm(e.target.value)}
                label="Send Message"
                variant="filled"
              />
            </Grid>
            <Grid xs={2} sm={3} item>
              <Button onClick={sendMessage} style={{backgroundColor: "#d3d3d3", borderRadius: "0 3rem 3rem 0 ", padding: ".8rem"}}><SendIcon fontSize="large" /></Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    </div>
  );
};

export default Match;
