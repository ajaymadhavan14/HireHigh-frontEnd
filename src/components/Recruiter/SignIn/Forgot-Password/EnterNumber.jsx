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
import Container from '@mui/material/Container';
import BusinessIcon from '@mui/icons-material/Business';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../../firebase/Config';
import axios from '../../../../axios/axios';
import AuthContext from '../../../../context/AppContext';

const theme = createTheme();

export default function RFPEnterNumber() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const { recruiterDetails, setRecruiterDetails } = useContext(AuthContext);
  const { recruiterOtpConf, setRecruiterOtpConf } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-recruiter-container',
      {},
      auth,
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      phoneNumber: data.get('phoneNumber'),
    };
    const regPhone = /^[0-9]+$/;
    if (data.phoneNumber) {
      if (regPhone.test(data.phoneNumber)) {
        setPhoneNumber(false);
        setPhoneNumberError('');
        if (data.phoneNumber.length === 10) {
          setPhoneNumber(false);
          setPhoneNumberError('');
          axios.post('/api/recruiter/enter_number', data).then(async (response) => {
            if (response.data.status === 'failed') {
              swal('sorry', response.data.message, 'error');
            } else {
              setRecruiterDetails(data);
              try {
                await setUpRecaptcha(`+91${data.phoneNumber}`).then((res) => {
                  setFlag(true);
                  setRecruiterOtpConf(res);
                  navigate('/recruiter/fp_otp');
                });
              } catch (error) {
                toast.warning(`${error.message}`, {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'colored',
                });
              }
            }
          });
        } else {
          setPhoneNumber(true);
          setPhoneNumberError('Please enter 10 digit');
        }
      } else {
        setPhoneNumber(true);
        setPhoneNumberError('Please Enter valid Phone no');
      }
    } else {
      setTotalRequired('All feilds are required');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <ToastContainer />
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
                  <BusinessIcon />
                </Avatar>
              </Box>
              <Typography
                sx={{ textAlign: 'center', fontWeight: '900' }}
                component="h1"
                variant="h5"
              >
                Enter Your Register Mobile Number
              </Typography>

              <hr />
              {/* <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px' }}>
                <p style={{ color: 'red' }}>{totalRequired}</p>
              </Box> */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 5 }}
              >
                {totalRequired && <Typography mb={0.5} sx={{ color: 'red', fontFamily: 'sans-serif' }} align="center">{totalRequired}</Typography>}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="PhoneNumber"
                  type="number"
                  id="phoneNumber"
                  error={phoneNumber}
                  helperText={phoneNumberError}
                  autoComplete="phoneNumber"
                />
                <Grid item xs={12} sx={{ px: 2 }}>
                  <div style={{ marginTop: '5px' }} id="recaptcha-recruiter-container" />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 5, mb: 1, p: 1.4, fontWeight: '900',
                  }}
                >
                  Get Otp
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
