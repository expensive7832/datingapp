import React, { useEffect, useRef, useState } from "react";
import "./profile.css";
import { Avatar, Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { Container, Stack } from "@mui/material";
import pp from "./../assets/images.jpeg"
import { PhotoCamera } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import WcIcon from '@mui/icons-material/Wc';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from 'axios'


const Profile = () => {

  const user = JSON?.parse(localStorage?.getItem('userData'))
  
  const imageSubmit = useRef()
  const inputTarget = imageSubmit.current

  const click = useRef()
  const Target = click.current

useEffect(() =>{
  inputTarget?.addEventListener('change', () =>{
    Target.click();
    
  })
}, [inputTarget])


const handleSubmit = async(e) =>{
  e.preventDefault()

 const data = new FormData(e.currentTarget)

 const profImg = data.get('profImg')
 data.append('imageId', user?.photoId)


  Axios.post(`/changepic/${user?._id}`, data).then((res) =>{
   
    localStorage.setItem('userData', JSON.stringify({...user, photo : res.data?.img, photoId : res?.data?.photoId}))
  
     toast.success(res.data.msg)
  }).catch((e) =>{
  toast.error(e.message)
  })

  
}


const navigate = useNavigate()

      
  const interest = () =>{
    if(user?.interest === 'male'){
      return <ManIcon/>
    }else if(user?.interest === 'female'){
      return <WcIcon/>
    }
    else {
      return <WcIcon/>
    }
  }

  const reload =(e) =>{
    e.preventDefault()
   navigate(0)
  }

const Logout = () =>{
  localStorage.removeItem('userData')
  toast('logout successfully')
  navigate('./../login')

}




  return (
    <Container id="profile">
      {user? 
      <Grid container>
      <Grid item xs={0} sm={2} />

      <Grid item xs={12} sm={8}>
        <Stack direction="row" justifyContent="space-between">

        
        <Button><ArrowBackIcon onClick={(e) => reload(e)}/></Button>
      

        
        <Button onClick={Logout} style={{color: "red"}}><LogoutIcon /></Button>
        
        </Stack>
        <div className="ppSection">
          <Avatar className="profImg" src={user?.photo} alt="profile pic" />
          <Typography style={{fontWeight: "bold"}} variant="body2">{user?.fname}</Typography>
         
         {/*************change image**************** */}

          <div className="changeImage">
          <form onSubmit={handleSubmit}>
          <label htmlFor='pp'><PhotoCamera/></label>
          <input ref={imageSubmit} hidden id="pp" type="file" accept="image/*" name="profImg"/>
        
          <button hidden ref={click}  type='submit'>submit</button>
         </form>
        </div>
        </div>
{
 
}
       
        <Divider/>
        
          {/*************info**************** */}
        <Stack style={{margin: "1rem 0"}} direction="row" justifyContent="space-between" spacing={3}>
        <Typography variant="h6">{user?.gender} &nbsp; {user?.age}</Typography>
        <Typography variant="h6">{user?.loc}</Typography>  
        </Stack>

        {/*************hobby**************** */}

        <Typography className="hobbyTitle" variant="p">Hobbies</Typography>
        
        <ul className="hobby">
          {user?.hobby?.map((hb, i) =>{
           return(
            <li key={i}>{hb}</li>
           )
          })}
          
        </ul>

        {/*************interest**************** */}
        <Typography gutterBottom className="interest" variant="p">Interested In</Typography><br/>
        <Button style={{margin: ".6rem 0"}} color="primary" size="small" startIcon={ interest() } variant="outlined">{user?.interest}</Button><br/>
       

        {/*************About me**************** */}
        <Typography className="aboutmeTitle" variant="p">About Me</Typography>
        <Typography variant="body2">{user?.about !== ''? user?.about : 'Tell us about Yourself'}</Typography>
        

        {/*************bottom button**************** */}
        
        <Stack style={{margin: "1rem 0", position: "absolute", bottom: "1rem"}} direction="row" justifyContent="start" spacing={3}>
     
        <Link to={`./../update/${user?._id}`}>
        <Button color="primary" startIcon={<UpdateIcon />} variant="outlined">Update</Button>
        </Link>
       
        <Link to={`./../delete/${user?._id}`}>
        <Button color="error" endIcon={<DeleteIcon/>} style={{color: "red"}} variant="outlined">Delete</Button>
        </Link>

        </Stack>
      </Grid>

      <Grid item xs={0} sm={2} />
    </Grid> : (
    <>
    <Typography>Login To Access This Page</Typography>
    <Link to="./../login"><Button variant="contained" color="secondary">Login!</Button></Link>
    </>
    )
}
    </Container>
  );
};

export default Profile;
