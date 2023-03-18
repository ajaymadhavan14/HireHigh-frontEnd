/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing, Dna } from 'react-loader-spinner';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../firebase/Config';
import AuthContext from '../../../context/AppContext';

const theme = createTheme();

export default function SeekerSignUp() {
  const [loading, setLoading] = useState(false);
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { userOtpConf, setUserOtpConf } = useContext(AuthContext);

  const [firstName, setFirstName] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(false);
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-seeker-container',
      {},
      auth,
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = new FormData(event.currentTarget);
    data = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      phoneNumber: data.get('phoneNumber'),
      confPassword: data.get('confPassword'),
    };
    if (data.firstName && data.lastName && data.email && data.password
      && data.phoneNumber && data.confPassword) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired('');
      if (regName.test(data.firstName)) {
        setFirstName(false);
        setFirstNameError('');
        if (regName.test(data.lastName)) {
          setLastName(false);
          setLastNameError('');
          if (regEmail.test(data.email)) {
            setEmail(false);
            setEmailError('');
            if (regPhone.test(data.phoneNumber)) {
              setPhoneNumber(false);
              setPhoneNumberError('');
              if (data.phoneNumber.length === 10) {
                setPhoneNumber(false);
                setPhoneNumberError('');
                if (data.password.length >= 6) {
                  setPassword(false);
                  setPasswordError('');
                  if (data.password === data.confPassword) {
                    setPassword(false);
                    setConfPassword(false);
                    setPasswordError('');
                    setConfPasswordError('');
                    // axios.post('/signup', data).then((response) => {
                    //   if (response.data.status === 'success') {
                    //     navigate('/login');
                    //   } else {
                    //     swal('OOPS', response.data.message, 'error');
                    //   }
                    // });
                    setUserDetails(data);
                    try {
                      await setUpRecaptcha(`+91${data.phoneNumber}`).then((res) => {
                        setFlag(true);
                        setUserOtpConf(res);
                        navigate('/otp');
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
                  } else {
                    setLoading(false);
                    setPassword(true);
                    setConfPassword(true);
                    setPasswordError('Password is not match');
                    setConfPasswordError('Password is not match');
                  }
                } else {
                  setLoading(false);
                  setPassword(true);
                  setPasswordError('Minimum 6 character');
                }
              } else {
                setLoading(false);
                setPhoneNumber(true);
                setPhoneNumberError('Please enter 10 digit');
              }
            } else {
              setLoading(false);
              setPhoneNumber(true);
              setPhoneNumberError('Please Enter valid Phone no');
            }
          } else {
            setLoading(false);
            setEmail(true);
            setEmailError('Please enter valid Email');
          }
        } else {
          setLoading(false);
          setLastName(true);
          setLastNameError('Please enter valid Name');
        }
      } else {
        setLoading(false);
        setFirstName(true);
        setFirstNameError('Please enter valid Name');
      }
    } else {
      setLoading(false);
      setTotalRequired('Please enter your Details');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Typography sx={{
        marginLeft: '6%',
        color: '#6096B4',
        cursor: 'pointer',
        width: 'fit-content',
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
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/* <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px' }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box> */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {totalRequired && <Typography mb={0.5} sx={{ color: 'red', fontFamily: 'sans-serif' }} align="center">{totalRequired}</Typography>}
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
                  error={firstName}
                  helperText={firstNameError}
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
                  error={lastName}
                  helperText={lastNameError}
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
                  id="phoneNumber"
                  type="number"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  error={phoneNumber}
                  helperText={phoneNumberError}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confPassword"
                  label="Confirm Password"
                  type="password"
                  id="confPassword"
                  autoComplete="new-password"
                  error={confPassword}
                  helperText={confPasswordError}
                />
              </Grid>
            </Grid>
            <div id="recaptcha-seeker-container" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                {loading && (
                <Dna
                  visible
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
                )}
                <Link onClick={() => { navigate('/login'); }} variant="body2" component="button">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
