import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom'
import { Card, CardContent, Input, InputLabel, RadioGroup } from '@material-ui/core';
import { PhotoCamera, TextFields } from '@mui/icons-material';
import Axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';


const SignUp = () => {

  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [fname, setFname] = useState('')

    const handleSubmit = (e) =>{
      
      e.preventDefault();
    
      const data = new FormData(e.currentTarget  );
      
      Axios.post('/register', data, {
        contentType: 'application/json'
      }).then((res) =>{
        res?.data?.msg === 'account successfully created' && localStorage.setItem('userData', JSON?.stringify(res?.data?.validate))
         res?.data?.msg === 'account successfully created' && navigate('./../')
         window.location.reload()
         toast.success(res.data.msg)
      }).catch((e) =>{
      toast(e)
      })

    }
    
  return (
    <div id='signUp'>
    
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
            Sign up
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
                  label="First Name"
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="date of birth"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor='photo'><PhotoCamera/></label>
              <Input name="photo" type="file" id='photo' ></Input>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
                  <FormLabel id='gender'>Gender </FormLabel><br/>
                  
                    Male &nbsp; <input checked type='radio' value='male' name='gender'/>
                    Female &nbsp; <input type='radio' value='female' name='gender'/>
                   Both &nbsp;  <input type='radio' value='both' name='gender'/>
                  
               
              </Grid>
              <Grid item xs={12} sm={6}>
              
                  <FormLabel id='interested'>Interested In</FormLabel><br/>
                 
                  Male &nbsp; <input type='radio' checked value='male' name='interest'/>
                    Female &nbsp; <input type='radio' value='female' name='interest'/>
                   Both &nbsp;  <input type='radio' value='both' name='interest'/>
                  
               
              </Grid>
              <Grid item xs={12}>
              <TextField
          id="about"
          label="About Me"
          multiline
          maxRows={6}
        fullWidth
        name='about'
        variant="filled" 
        />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirmpassword"
                />
              </Grid>
             
            </Grid>
            
            <Grid container justifyContent="space-between" alignItems="center" style={{height:"15vh"}}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 5 }}
            >
              Sign Up
            </Button>
              <Grid item>
                <Link to="./../login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
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

export default SignUp