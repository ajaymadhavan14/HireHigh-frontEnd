/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import swal from 'sweetalert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios/axios';

const theme = createTheme();

export default function VendorSignUp() {
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(false);
  const [confPassword, setConfPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confPasswordError, setConfPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      companyName: data.get('companyName'),
      email: data.get('email'),
      password: data.get('password'),
      confPassword: data.get('confPassword'),

    };
    if (data.companyName && data.email && data.password && data.confPassword) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      setTotalRequired('');
      if (regName.test(data.companyName)) {
        setCompanyName(false);
        setCompanyNameError('');
        if (regEmail.test(data.email)) {
          setEmail(false);
          setEmailError('');
          if (data.password.length >= 6) {
            setPassword(false);
            setPasswordError('');
            if (data.password === data.confPassword) {
              setPassword(false);
              setConfPassword(false);
              setPasswordError('');
              setConfPasswordError('');
              axios.post('/api/recruiter/signup', data).then((response) => {
                if (response.data.status === 'success') {
                  navigate('/recruiter/login');
                } else {
                  swal('OOPS', response.data.message, 'error');
                }
              });
            } else {
              setPassword(true);
              setConfPassword(true);
              setPasswordError('Password is not match');
              setConfPasswordError('Password is not match');
            }
          } else {
            setPassword(true);
            setPasswordError('Minimum 6 character');
          }
        } else {
          setEmail(true);
          setEmailError('Please enter valid Email');
        }
      } else {
        setCompanyName(true);
        setCompanyNameError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };

  return (
    <ThemeProvider ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid
            sx={{
              backgroundColor: '#fff', border: '1px solid lightgray', p: 2, borderRadius: '10px',
            }}
            container
            spacing={2}
          >
            <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }} xs={12} sm={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img style={{ width: '55vh', height: '55vh', cursor: 'pointer' }} src="/HH-L.png" alt="Loading..." onClick={() => { navigate('/'); }} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ mnb: 1, bgcolor: 'secondary.main' }}>
                  <AddBusinessIcon />
                </Avatar>
              </Box>
              <Typography sx={{ textAlign: 'center', fontWeight: '900' }} component="h1" variant="h5">
                Recruiter SIGN UP
              </Typography>

              <hr />
              <br />
              <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
                <p style={{ color: 'red' }}>{totalRequired}</p>
              </Box>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="companyName"
                      required
                      fullWidth
                      id="companyName"
                      label="Company Name"
                      error={companyName}
                      helperText={companyNameError}
                      autoFocus
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
                      error={email}
                      helperText={emailError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="New Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={password}
                      helperText={passwordError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confPassword"
                      label="Cofirm Password"
                      type="password"
                      id="confPassword"
                      autoComplete="new-password"
                      error={confPassword}
                      helperText={confPasswordError}
                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2, p: 1.4, fontWeight: '900',
                  }}
                >
                  SIGNUP
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={() => { navigate('/recruiter/login'); }} variant="body2" component="button">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
