/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing, Dna } from 'react-loader-spinner';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth, storage } from '../../../firebase/Config';
import AuthContext from '../../../context/AppContext';

const theme = createTheme();
export default function SignnUPCompany() {
  const { companyDetails, setCompanyDetails } = useContext(AuthContext);
  const { companyOtpConf, setCompanyOtpConf } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [tagLine, setTagline] = useState(false);
  const [tagLineError, setTaglineError] = useState('');
  const [discription, setDiscription] = useState(false);
  const [discriptionError, setDiscriptionError] = useState('');
  const [website, setWebsite] = useState(false);
  const [websiteError, setWebsiteError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [password, setPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confPassword, setConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-company-container',
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
      companyName: data.get('companyName'),
      email: data.get('email'),
      password: data.get('password'),
      confPassword: data.get('confPassword'),
      userName: data.get('userName'),
      tagLine: data.get('tagLine'),
      website: data.get('website'),
      discription: data.get('discription'),
      phoneNumber: data.get('phoneNumber'),
      image: data.get('image'),

    };
    if (data.companyName && data.email && data.password && data.confPassword && data.userName
         && data.phoneNumber && data.tagLine && data.website && data.discription && data.image) {
      const regName = /^[a-zA-Z]+$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired('');
      if (regName.test(data.userName)) {
        setUserName(false);
        setUserNameError('');
        if (regName.test(data.companyName)) {
          setCompanyName(false);
          setCompanyNameError('');
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
                    if (data.image.name) {
                      const allowedFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                      if (!allowedFormats.exec(data.image.name)) {
                        toast.error('Invalid file type!', {
                          position: 'top-right',
                          autoClose: 4000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: 'colored',
                        });
                      } else {
                        const dirs = Date.now();
                        const rand = Math.random();
                        const { image } = data;
                        const imageRef = ref(storage, `/companyImages/${dirs}${rand}_${image?.name}`);
                        const toBase64 = (image) => new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(image);
                          reader.onload = () => resolve(reader.result);
                          reader.onerror = (error) => reject(error);
                        }).catch((err) => {
                          navigate('/error-page');
                        });
                        const imgBase = await toBase64(image);
                        await uploadString(imageRef, imgBase, 'data_url').then(async () => {
                          const downloadURL = await getDownloadURL(imageRef);
                          data.image = downloadURL;
                        });
                      }
                    } else {
                      data.image = '';
                    }
                    // axios.post('/recruiter/signup', data).then((response) => {
                    //   if (response.data.status === 'success') {
                    //     navigate('/recruiter/login');
                    //   } else {
                    //     swal('OOPS', response.data.message, 'error');
                    //   }
                    // });
                    setCompanyDetails(data);
                    try {
                      await setUpRecaptcha(`+91${data.phoneNumber}`).then((res) => {
                        setFlag(true);
                        setCompanyOtpConf(res);
                        navigate('/company/otp');
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
                setPhoneNumber(true);
                setPhoneNumberError('Please enter 10 digit');
              }
            } else {
              setPhoneNumber(true);
              setPhoneNumberError('Please Enter valid Phone no');
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
        setCompanyName(true);
        setCompanyNameError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography sx={{
        marginLeft: '6%',
        color: '#6096B4',
        cursor: 'pointer',
        width: 'fit-content',
      }}
      >
        <h2 onClick={() => navigate('/')}>HIREHIGH</h2>
      </Typography>
      <Container component="main" maxWidth="md">
        <ToastContainer />
        <CssBaseline />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Company Sign up
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="userName"
                type="text"
                required
                fullWidth
                id="userName"
                label="User Name"
                error={userName}
                helperText={userNameError}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="companyName"
                type="text"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                error={companyName}
                helperText={companyNameError}
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="tagLine"
              type="text"
              label="Tag Line"
              name="tagLine"
              autoComplete="tagLine"
              error={tagLine}
              helperText={tagLineError}
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="discription"
              type="text"
              label="Discription"
              placeholder="Discription"
              name="discription"
              autoComplete="discription"
              error={discription}
              helperText={discriptionError}
            />
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="website"
                label="website"
                name="website"
                autoComplete="website"
                error={website}
                helperText={websiteError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="image"
                type="file"
                placeholder="Company Image"
                name="image"
                autoComplete="image"
                error={image}
                helperText={imageError}
                onChange={(e) => {
                  const allowedFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                  const fileType = e.target.files[0].name;
                  if (!allowedFormats.exec(fileType)) {
                    toast.error('Invalid file type!', {
                      position: 'top-right',
                      autoClose: 4000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'colored',
                    });
                  } else {
                    setImage(e.target.files[0]);
                    toast.success('success', {
                      position: 'top-right',
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'colored',
                    });
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
          <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box>
          <Grid container spacing={2} py={2} sx={{ justifyContent: 'flex-end' }}>
            <div id="recaptcha-company-container" />
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
            <Grid>
              <Link onClick={() => { navigate('/company/login'); }} component="button">
                Already have an account? Sign in
              </Link>
            </Grid>
            <Grid pl={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: '900',
                }}
              >
                SIGNUP
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
