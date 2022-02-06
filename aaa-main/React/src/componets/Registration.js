import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import Login from './Login'

const Registration = () => {
  // const history = useHistory();
  
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const [user, setUser] = useState({
    name: '',
    std: '',
    age: '',
    email:'',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { name, std, age,email, password } = user;
    if (!name || !std || !age || !email ||!password) {
      toast.error('Please enter all the detail');
    } else {
      try {
        const { data } = await axios.post(
          'http://localhost:3000/studentRegistration',
          user
        );
        //console.log('da', data.message);
        toast.success(data.message);
        //.post('http://localhost:4000/auth/register', user)
        //.then((res) => {
        //toast.success(res.data.message);
        //history.push('/login');
        //});
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };


  // function handleClick (){ history.push('./Profile')};  

  return (
    <Grid className="register">
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonAddAltIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <TextField
          fullWidth
          label="name"
          name="name"
          input
          type="text"
          value={user.name}
          placeholder="Enter your name"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="std"
          name="std"
          type="number"
          value={user.std}
          placeholder="Enter your Std"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="age"
          name="age"
          type="number"
          value={user.age}
          placeholder="Enter Your Age"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="email"
          name="email"
          input
          type="email"
          value={user.email}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
          <TextField
          fullWidth
          label="password"
          name="password"
          input
          type="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={register}
          name="registration"
        >
          Registration
        </Button>
    
        <Router>
        <Route exact path="/" component={Login} />
      </Router>
      
 

      </Paper>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  );
};

export default Registration;
