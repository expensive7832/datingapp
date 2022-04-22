import React from "react";
import TinderCard from "react-tinder-card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Avatar, Box, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Axios from 'axios'


const Tindercard = ({ user }) => {

  const navigate = useNavigate()

  const loginUser = JSON?.parse(localStorage?.getItem('userData'))
        
  const onSwipe = (userId, loginId ) => {
    Axios.post('/match/', {
      swipeId: userId,
      loginId: loginId
    }).then((res) =>{
     
        navigate(`./match/${res?.data?.loginUser}/${res?.data?.swipeUser}`)
    
    }).catch((e) =>{
    console.log(e.message)
    })
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <Box className="tinder-card">
    {user !== "" ?
     <TinderCard
    
    onSwipe={() => onSwipe(user?._id, loginUser?._id)}
    onCardLeftScreen={() => onCardLeftScreen("fooBar")}
    preventSwipe={["right", "left"]}
  >
    
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="animate__animated animate__flip animate__slow"
    >
     
      <div className="tinder-card-inner">
      <Card>
       {
         !user?.photo ?  <Avatar/> :
         <CardMedia
         component="img"
         height="194"
         style={{width:"100%"}}
         src={user?.photo}
         />
       }
        <CardContent className="">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={6}>{user?.fname}</Grid>
            {user?.age &&
            <Grid item xs={6}><em style={{backgroundColor: "red", borderRadius: "50%", maxWidth: "1.2rem", padding: "10px", color: "#fff", fontWeight: "bold"}}>{user?.age}</em>yrs</Grid>
            }
            
          </Grid>
          <section className="tinder-hobby">
          {user?.hobby?.map((hb) =>{
            return(
              <Typography variant="body2">{hb}</Typography>
            )
          })}
          
          
          </section>
          <Typography variant="body" className="aboutMe">
            {user?.about}
          </Typography>
        </CardContent>

      </Card>
             
      </div>
      
    </Grid>
  </TinderCard> 
  : 
  <Typography>No more user! Try Again Later</Typography>}
    </Box>
  );
};

export default Tindercard;
