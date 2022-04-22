import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom'
import { Card, CardContent, InputLabel } from '@material-ui/core';
import { TextFields } from '@mui/icons-material';
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {  FormLabel, Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import { useParams } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const UpdateUser = () => {

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [loc, setLoc] = useState("")
  const [hobby, setHobby] = useState("")
  const [gender, setGender] = useState("")
  const [interest, setInterest] = useState('')
  const [about, setAbout] = useState('')
  const [data, setData] = useState('')
  const [password, setPassword] = useState('')

  const {userId} = useParams()

  useEffect(() =>{
    Axios.post(`/update/${userId}`, {id:userId} , {
        contentType: 'application/json'
      }).then((res) =>{
         setData(res?.data)
        
      }).catch((e) =>{
      console.log(e)
      })

  }, [userId])

    const handleSubmit = (e) =>{
      
      e.preventDefault();
      Axios.put(`/update/${userId}`, {id:userId, gender: gender, firstName: firstName, lastName: lastName, hobby: hobby, password: password, interest: interest, about: about, age: age} , {
        contentType: 'application/json'
      }).then((res) =>{
        if(res?.data?.user){
          localStorage.setItem('userData', JSON?.stringify(res?.data?.user))
        }
         toast(res?.data?.msg)
         navigate("./../../")
        
      }).catch((e) =>{
      console.log(e)
      })
      
    }

    const [changePasswordView, setChangePasswordView] = useState(null)
    
  return (
    <div id='updateuser'>
    
         <Grid container>
            <Grid item xs={1} sm={3}/>
            <Grid item xs={10} sm={6}>
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Card>
              <CardContent>
              <Typography component="h1" variant="h5">
            Update User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder={data?.fname}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                  value={firstName !== "" ? firstName : data?.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName !== "" ? lastName : data?.lname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  name="age"
                  placeholder={data?.age}
                  autoComplete="date of birth"
                  value={age !== "" ? age : data?.age}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
               <Stack direction="row">
               <TextField
                  fullWidth
                  name="password"
                  type={changePasswordView ? "text": "password"}
                  id="password"
                  placeholder={data?.pass}
                  autoComplete="new-password"
                  value={password !== "" ?  password : data?.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RemoveRedEyeIcon onClick={() => {setChangePasswordView(true)}}/>
               </Stack>
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                
                placeholder={data?.loc}
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  onChange={(e) => setLoc(e.target.value)}
                  value={loc !== "" ? loc : data?.loc}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="hobby"
                  onChange={(e) => setHobby(e.target.value)}
                  name="hobby"
                  autoComplete="hobby"
                  value={hobby !== "" ? hobby : data?.hobby}
                  placeholder={data?.hobby}
                />
                <InputLabel style={{color:"blue"}}>enter your hobby separated by comma(,)</InputLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                
                  <FormLabel id='gender'>Gender </FormLabel><br/>
                  
                    Male &nbsp; <input onChange={(e) => setGender(e.target.value)} checked={data?.gender === 'male' && true} type='radio' value='male' name='gender' />
                    Female &nbsp; <input onChange={(e) => setGender(e.target.value)} checked={data?.gender === 'female' && true} type='radio' value='female' name='gender'/>
                   Both &nbsp;  <input onChange={(e) => setGender(e.target.value)} checked={data?.gender === 'both' && true} type='radio' value='both' name='gender'/>
                  
               
              </Grid>
              <Grid item xs={12} sm={6}>
              
                  <FormLabel id='interested'>Interested In</FormLabel><br/>
                 
                  Male &nbsp; <input onChange={(e) => setInterest(e.target.value)} checked={data?.gender === 'male' && true} type='radio' checked value='male' name='interest'/>
                    Female &nbsp; <input onChange={(e) => setInterest(e.target.value)} checked={data?.gender === 'female' && true} type='radio' value='female' name='interest'/>
                   Both &nbsp;  <input onChange={(e) => setInterest(e.target.value)} checked={data?.gender === 'both' && true} type='radio' value='both' name='interest'/>
                  
               
              </Grid>
              <Grid item xs={12}>
              <TextField
          id="about"
          multiline
          maxRows={6}
        fullWidth
        name='about'
        variant="filled" 
        value={about !== "" ? about : data?.about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder={data?.about ? data?.about: "Tell us about you"}
        />
              </Grid>
            
             
            </Grid>
            
            <Grid container justifyContent="space-between" alignItems="center" style={{height:"15vh"}}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 5 }}
            >
              Update
            </Button>
              
            </Grid>
          
          </Box>
              </CardContent>
            </Card>
        </Box>
         
            </Grid>
            <Grid item xs={1} sm={3}/>
         </Grid>
    </div>
  )
}

export default UpdateUser