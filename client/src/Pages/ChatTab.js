import React, { useEffect } from 'react'
import { Avatar, Badge, Box, Card, Container, Typography } from '@material-ui/core'
import { Stack } from '@mui/material'
import './chatTab.css'
import { Link } from 'react-router-dom'
import tinderimg from './../assets/tinder-1.svg'

const ChatTab = ({friendList}) => {

  return (
    <div id='chatTab'>
        <Box style={{marginBottom: '2rem'}}>
        <img src={tinderimg}/>
        </Box>
        {friendList?.map((fL) =>{
         return(
          <Link to={`./../chat/${fL?._id}`} key={fL?._id}>
          <Stack direction='row' justifyContent="space-evenly" alignItems="center" spacing={1}>
          <Badge variant="dot" badgeContent=" " style={{margin: "1rem 0"}} color="primary">
            <Container>
            <Avatar src={fL?.photo} alt="" />
            </Container>
            </Badge>
            <Container>
              <Typography variant="body2">{fL?.fname}</Typography>
            </Container>
            </Stack>
          </Link>
         )
        })}
       
    </div>
  )
}

export default ChatTab