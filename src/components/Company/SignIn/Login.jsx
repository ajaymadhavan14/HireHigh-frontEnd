/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BusinessIcon from '@mui/icons-material/Business';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import axios from '../../../axios/axios';

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (data.email && data.password) {
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      if (regEmail.test(data.email)) {
        setEmail(false);
        setEmailError('');
        if (data.password.length >= 6) {
          setPassword(false);
          setPasswordError('');

          axios.post('/api/company/login', data).then((response) => {
            if (!response.data.auth) {
              swal('sorry', response.data.message, 'error');
            } else {
              localStorage.setItem('companyToken', response.data.token);
              navigate('/company/home');
            }
          });
        } else {
          setPassword(true);
          setPasswordError('Minimum 6 character');
        }
      } else {
        setEmail(true);
        setEmailError('Please enter valid Email');
      }
    } else {
      setTotalRequired('All feilds are required');
    }
  };
  const token = localStorage.getItem('companyToken');

  useEffect(() => {
    if (token) {
      navigate('/company/home');
    } else {
      navigate('/company/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Typography sx={{
        color: '#6096B4', cursor: 'pointer', width: 'fit-content', marginLeft: '6%',
      }}
      >
        <h2 onClick={() => navigate('/')}>HIREHIGH</h2>
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: '#6096B4' }}>
            <BusinessIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Company Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={email}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={password}
              helperText={passwordError}
            />

            {/* <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px' }}>
              <p style={{ color: 'red' }}>{totalRequired}</p>
            </Box> */}
            {totalRequired && <Typography mb={0.5} sx={{ color: 'red', fontFamily: 'sans-serif' }} align="center">{totalRequired}</Typography>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link variant="body2" onClick={() => navigate('/enter_number')} component="button">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link onClick={() => navigate('/company/signup')} variant="body2" component="button">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
