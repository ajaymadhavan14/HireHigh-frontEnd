import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from '../../axios/axios';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
});

export default function ASignIn() {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const signinData = {
        email: data.get('email'),
        password: data.get('password'),
      };
      if (signinData.email && signinData.password) {
        const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
        if (regEmail.test(signinData.email)) {
          setEmail(false);
          setEmailError('');
          if (signinData.password.length >= 6) {
            setPassword(false);
            setPasswordError('');
            axios.post('/api/admin/login', signinData).then((response) => {
              if (!response.data.auth) {
                swal('sorry', response.data.message, 'error');
              } else {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/home');
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
    } catch (err) {
      err();
    }
  };
  useEffect(() => {
    if (token) {
      navigate('/admin/home');
    } else {
      navigate('/admin/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontWeight: '600', ml: 5, mt: 5, color: '#6096B4',
        }}
      >
        HIREHIGH
      </Typography>
      <Container component="main" maxWidth="xs">

        <CssBaseline />

        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h4" sx={{ fontWeight: '600' }}>
            Welcome to ADMIN
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {totalRequired && <Typography mb={0.5} sx={{ color: 'red', fontFamily: 'sans-serif' }} align="center">{totalRequired}</Typography>}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={email}
                  helperText={emailError}
                  sx={{
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4f4e4e' }, // styles the label
                    '& .MuiOutlinedInput-root.Mui-focused': { '& > fieldset': { borderColor: '#f22c50' } },
                    '& .MuiOutlinedInput-root': { '& fieldset': { borderRadius: 3 } },
                  }}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password}
                  helperText={passwordError}
                  sx={{
                    '& .MuiInputLabel-root.Mui-focused': { color: '#4f4e4e' },
                    '& .MuiOutlinedInput-root.Mui-focused': { '& > fieldset': { borderColor: '#f22c50' } },
                    '& .MuiOutlinedInput-root': { '& fieldset': { borderRadius: 3 } },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '20px',
                height: '42px',
                backgroundColor: '#6096B4',
                '&:hover': { backgroundColor: '#347aeb' },
                textTransform: 'none',

              }}
            >
              SIGN IN
            </Button>

          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}
