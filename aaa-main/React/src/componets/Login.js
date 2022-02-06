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

import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  
  const paperStyle = { padding: '30px 20px', width: 300, margin: '20px auto' };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const [user, setUser] = useState({
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

  const login = async () => {
    const {email, password } = user;
    if (!email ||!password) {
      toast.error('Please enter all the detail');
    } else {
      try {
        const { data } = await axios.post(
          'http://localhost:3000/login',
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

  return (
    <Grid className="login">
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <PersonAddAltIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign in</h2>
          <Typography variant="caption" gutterBottom>
            Please enter valid email id and password after you can login !
          </Typography>
        </Grid>
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
          onClick={login}
        //   onClick={profile}
        >
          Login
        </Button>
      </Paper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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

export default Login;
