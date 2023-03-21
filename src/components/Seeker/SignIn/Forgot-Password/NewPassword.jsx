/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../axios/axios';
import AuthContext from '../../../../context/AppContext';

const theme = createTheme();

export default function SeekerSetNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState('');
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { userOtpConf, setUserOtpConf } = useContext(AuthContext);
  const [totalRequired, setTotalRequired] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      password: data.get('password'),
      confPassword: data.get('confPassword'),
      phoneNumber: `${userDetails.phoneNumber}`,
    };
    if (data.password && data.confPassword) {
      if (data.password.length >= 6) {
        setPassword(false);
        setPasswordError('');
        if (data.password === data.confPassword) {
          setPassword(false);
          setConfPassword(false);
          setPasswordError('');
          setConfPasswordError('');
          axios.post('/api/new_password', data).then((response) => {
            if (response.data.status === 'failed') {
              swal('sorry', response.data.message, 'error');
            } else {
              navigate('/login');
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
      setTotalRequired('All feilds are required');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid
            sx={{
              backgroundColor: '#fff',
              border: '1px solid lightgray',
              p: 2,
              borderRadius: '10px',
            }}
            container
            spacing={2}
          >
            <Grid
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              item
              xs={12}
              sm={6}
            >
              <Box sx={{ textAlign: 'center' }}>
                <img
                  style={{ width: '55vh', height: '55vh', cursor: 'pointer' }}
                  src="/HH-L.png"
                  alt="Loading..."
                  onClick={() => {
                    navigate('/');
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
                  <AccountCircleIcon />
                </Avatar>
              </Box>
              <Typography
                sx={{ textAlign: 'center', fontWeight: '900' }}
                component="h1"
                variant="h5"
              >
                Enter New Password
              </Typography>

              <hr />
              {/* <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px' }}>
                <p style={{ color: 'red' }}>{totalRequired}</p>
              </Box> */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                {totalRequired && <Typography mb={0.5} sx={{ color: 'red', fontFamily: 'sans-serif' }} align="center">{totalRequired}</Typography>}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password}
                  helperText={passwordError}
                />
                <TextField
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2, p: 1.4, fontWeight: '900',
                  }}
                >
                  SUBMIT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
