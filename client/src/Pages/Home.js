import React, { useState, useEffect } from "react";
import "./home.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/People";
import Chat from "@material-ui/icons/Chat.js";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ClearIcon from "@material-ui/icons/Clear";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import PaymentIcon from "@material-ui/icons/Payment";
import Tindercard from "./Tindercard";
import ChatTab from "./ChatTab";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../components/Profile";


const Home = ({friendList}) => {
  const [userData, setUserData] = useState("");

  const user = JSON?.parse(localStorage?.getItem('userData'))

const request = user?.req?.map((uR) => uR)


  useEffect(() => {
    const getUser = async () =>
      await Axios.put(`/${user?._id}`, {interest : user?.interest}, {
        contentType: "application/json",
      }).then((res) => {

          setUserData(res?.data?.filter((users) => !user?.req?.includes(users?._id)))
         
        })
        .catch((e) => {
          toast.warn(e);
        });
    getUser();
  }, [userData]);



  const [selectTab, setSelectTab] = useState(1);

  const handleTabSelect = (event, newValue) => {
    setSelectTab(newValue);
  };
  


  return (
    <div id="Home">
    
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
              display: `${selectTab !== 1? "none" : "block"}`
            }}
          >
            <Tabs
              className="tabs"
              value={selectTab}
              onChange={handleTabSelect}
              aria-label="icon menu"
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab style={{ color: "#fff" }} icon={<Person />} />
              <Tab style={{ color: "#fff" }} icon={<WhatshotIcon />} />
              <Tab style={{ color: "#fff" }} icon={<Chat />} />
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
          {selectTab === 1 && (
            <div className="tinder-card" style={{ top: `${userData && "-15vh"}` }}>
              {!userData ? (
                <CircularProgress style={{ color: "red" }} />
              ) : (
                <>
                  {userData?.map((e, i) => (
                  i - 1 === 0 ?
                  
                    <Stack direction='row' justifyContent="space-evenly" alignItems="center" spacing={1}>
                  <Typography variant="body2" style={{color: "#fff", textShadow: "0 0 2px #000", display: i - 1  === 0 ? "block" : "none", fontSize: "1rem", padding: "1rem auto"}}>No More User!!! Base on your interest. Try again later</Typography>
              </Stack>
                  :
                  
              
                   <Tindercard key={e?._id} user={e} />
                   
                  ))}
                </>
              )}
            </div>
          )}
          {selectTab === 2 && (
            <div className="chat">
              <ChatTab friendList={friendList}/>
            </div>
          )}
          {selectTab === 0 && <Profile tab={setSelectTab} />}
        </Grid>

        <Grid xs={0} md={2} item />
      </Grid>

      <Grid
        container
        jusifyContent="center"
        alignItem="center"
        className="bottomBar"
        style={{
          height: "10vh",
          position: "fixed",
          bottom: "0",
          zIndex: "1",
          display: `${selectTab === 1 ? "block" : "none"}`,
        }}
      >
        <Grid item xs={0} sm={2} />
       
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Link to="./../pricing">
              <IconButton >
                <PaymentIcon size="large" />
              </IconButton>
              </Link>
            
            <IconButton>
                <FavoriteIcon size="large" />
              </IconButton>

              <IconButton>
                <ClearIcon size="large" />
              </IconButton>
          </Stack>
       
        <Grid item xs={0} md={2} />
      </Grid>
       
    </div>
  );
};

export default Home;
