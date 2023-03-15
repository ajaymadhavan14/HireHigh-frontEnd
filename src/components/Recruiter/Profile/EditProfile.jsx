/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import swal from 'sweetalert';
import { toast, ToastContainer } from 'react-toastify';
import { ColorRing, Dna } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';
import { getProfileData } from '../../../apis/RecruiterApi';

const theme = createTheme();
export default function RecruiterPrfileData() {
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
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');

  const navigate = useNavigate();
  const [datas, setDatas] = useState({});
  const token = localStorage.getItem('recruiterToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getProfileData(token).then((response) => {
          setDatas(response);
        });
      }());
    } else {
      navigate('/recruiter/login');
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get('email'),
      userName: data.get('userName'),
      tagLine: data.get('tagLine'),
      website: data.get('website'),
      discription: data.get('discription'),
      phoneNumber: data.get('phoneNumber'),
      image: data.get('image'),
      location: data.get('location'),
      companyName: datas?.companyName?._id,

    };
    if (data.companyName && data.email && data.userName && data.location
         && data.phoneNumber && data.tagLine && data.website && data.discription) {
      const regName = /^[a-zA-Z ]+$/;
      const regEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
      const regPhone = /^[0-9]+$/;
      setTotalRequired('');
      if (regName.test(data.userName)) {
        setUserName(false);
        setUserNameError('');

        if (regEmail.test(data.email)) {
          setEmail(false);
          setEmailError('');
          if (regPhone.test(data.phoneNumber)) {
            setPhoneNumber(false);
            setPhoneNumberError('');
            if (data.phoneNumber.length === 10) {
              setPhoneNumber(false);
              setPhoneNumberError('');

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
                  const imageRef = ref(storage, `/seekerImages/${dirs}${rand}_${image?.name}`);
                  const toBase64 = (image) => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                  }).catch((err) => {
                    console.log(err);
                  });
                  const imgBase = await toBase64(image);
                  await uploadString(imageRef, imgBase, 'data_url').then(async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    data.image = downloadURL;
                  });
                }
              } else {
                data.image = datas.image;
              }
              if (token) {
                axios.post('/api/recruiter/profile-edit-post', data, { headers: { 'recruiter-access-token': token } }).then((response) => {
                  if (response.data.status === 'success') {
                    navigate('/recruiter/profile');
                  } else {
                    swal('OOPS', response.data.message, 'error');
                  }
                });
              } else {
                navigate('/recruiter/login');
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
        setUserName(true);
        setUserNameError('Please enter valid Name');
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
        <CssBaseline />
        <ToastContainer />
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
              Sign up
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="userName"
                type="text"
                id="userName"
                label="User Name"
                error={userName}
                helperText={userNameError}
                defaultValue={datas?.userName}
                multiline
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
                value={datas?.companyName?.companyName}
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
                defaultValue={datas?.phoneNumber}
                multiline
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
                defaultValue={datas?.email}
                multiline

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
              defaultValue={datas?.tagLine}
              multiline

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
              defaultValue={datas?.discription}
              multiline

            />
          </Grid>
          <Grid container spacing={2} py={2}>

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
                  }
                }}
              />
            </Grid>
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
                defaultValue={datas?.website}
                multiline
              />

            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <img src={datas?.image} alt="...loading" style={{ height: '30vh', width: '45vh' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="location"
                type="text"
                label="Location"
                name="location"
                autoComplete="location"
                error={location}
                helperText={locationError}
                defaultValue={datas?.location}
                multiline
              />
            </Grid>
          </Grid>
          <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box>
          <Grid container spacing={2} py={2} sx={{ justifyContent: 'flex-end' }}>
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
            <Grid pl={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: '900',
                }}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
