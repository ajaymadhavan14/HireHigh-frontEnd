/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { ColorRing, Dna } from 'react-loader-spinner';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';

const theme = createTheme();
export default function SeekerAddprofile() {
  const [loading, setLoading] = useState(false);
  const [headline, setHeadline] = useState(false);
  const [headlineError, setHeadlineError] = useState('');
  const [position, setPosition] = useState(false);
  const [positionError, setPositionError] = useState('');
  const [age, setAge] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [qualification, setQualification] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [qualificationError, setQualificationError] = useState('');
  const [discription, setDiscription] = useState(false);
  const [discriptionError, setDiscriptionError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [salaryRange, setSalaryRange] = useState(false);
  const [salaryRangeError, setSalaryRangeError] = useState('');
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [experiance, setExperiance] = useState('');
  const [experianceError, setExperianceError] = useState('');
  const [experiances, setExperiances] = useState([]);
  const [totalRequired, setTotalRequired] = useState('');
  const [pdf, setPdf] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');

  // pdf converted to base64
  const toBase64 = (image) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }).catch((err) => {
    console.log(err);
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = new FormData(event.currentTarget);
    const pdfBase = await toBase64(pdf);
    const experiance = experiances;
    const qualification = qualifications;
    data = {
      headline: data.get('headline'),
      position: data.get('position'),
      location: data.get('location'),
      discription: data.get('discription'),
      salaryRange: data.get('salaryRange'),
      age: data.get('age'),
      image: data.get('image'),
      qualifications: qualification,
      experiances: experiance,
      resume: pdfBase,
    };
    if (data.position && data.headline && data.qualifications && data.experiances
      && data.discription && data.age && data.location && data.image
         && data.salaryRange && data.resume) {
      const regName = /^[a-zA-Z ]*$/;
      setTotalRequired('');
      if (regName.test(data.headline)) {
        setHeadline(false);
        setHeadlineError('');
        if (regName.test(data.position)) {
          setPosition(false);
          setPositionError('');

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
            data.image = '';
          }
          if (token) {
            axios.post('/api/add_profile', data, { headers: { 'user-access-token': token } }).then((response) => {
              if (response.data.status === 'success') {
                navigate('/home');
              } else {
                swal('OOPS', response.data.message, 'error');
              }
            });
          } else {
            swal('Please Login');
            navigate('/login');
          }
        } else {
          setPosition(true);
          setPositionError('Please enter valid Name');
        }
      } else {
        setHeadline(true);
        setHeadlineError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };

  // const onchangeInput = (val, index) => {
  //   const temp = qualification;
  //   temp[index] = val.target.value;
  //   setQualification(temp);
  //   console.log(temp);
  // };
  const arrayRemove = (index) => {
    const list = [...qualifications];
    list.splice(index, 1);
    setQualifications(list);
  };
  const ExRemove = (index) => {
    const list = [...experiances];
    list.splice(index, 1);
    setExperiances(list);
  };

  return (
    <ThemeProvider theme={theme}>

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
              Add Profile Details
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="headline"
                type="text"
                required
                fullWidth
                id="headline"
                label="Headline"
                error={headline}
                helperText={headlineError}
                autoFocus
                // defaultValue={user?.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="position"
                type="text"
                required
                fullWidth
                id="position"
                label="Position"
                error={position}
                helperText={positionError}
                autoFocus
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="salaryRange"
                type="text"
                required
                fullWidth
                id="salaryRange"
                label="Expected Salary"
                error={salaryRange}
                helperText={salaryRangeError}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                error={location}
                helperText={locationError}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <FormLabel>Profile Photo</FormLabel>
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
                      autoClose: 3000,
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
            <Grid item xs={12} sm={6} sx={{ marginTop: 'auto' }}>
              <TextField
                required
                fullWidth
                type="number"
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                error={age}
                helperText={ageError}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} py={2}>

            <TextField
              required
              id="qualification"
              type="text"
              label="Qualification"
              name="qualification"
              error={qualification}
              helperText={qualificationError}
              sx={{
                width: '92%',
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: 'skyblue',
                  },

              }}
              autoFocus
              onChange={(e) => setQualification(e.target.value)}
              variant="outlined"
            />
            <Button
              onClick={(e) => setQualifications([...qualifications,
                { text: qualification }])}
              variant="contained"
              sx={{ height: '7.5vh' }}
            >
              Add

            </Button>

          </Grid>
          {qualifications.map((e, index) => (

            <Grid item xs={12}>

              <TextField
                required
                id="qualifications"
                type="text"
                label="Qualifications"
                name="qualifications"
                autoComplete="qualification"
                error={qualifications}
                variant="outlined"
                sx={{
                  width: '90%',
                  marginBottom: '10px',
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                  },
                }}
                value={e.text}
                disabled

              />
              <Button
                variant="contained"
                sx={{ height: '7.5vh', bgcolor: 'red' }}
                onClick={() => { arrayRemove(index); }}
              >
                Dele

              </Button>

            </Grid>
          ))}
          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="experiance"
              type="text"
              label="Experiance"
              name="experiance"
              autoComplete="experiance"
              error={experiance}
              helperText={experianceError}
              sx={{
                width: '92%',
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: 'skyblue',
                  },

              }}
              onChange={(e) => setExperiance(e.target.value)}
            />
            <Button
              onClick={(e) => setExperiances([...experiances,
                { text: experiance }])}
              variant="contained"
              sx={{ height: '7.5vh' }}
            >
              Add

            </Button>
          </Grid>
          {experiances.map((e, index) => (
            <Grid item xs={12} py={2}>
              <TextField
                required
                fullWidth
                id="experiances"
                type="text"
                label="Experiances"
                name="experiances"
                autoComplete="experiances"
                error={experiances}
                sx={{
                  width: '90%',
                  marginBottom: '10px',
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'black',
                  },
                }}
                value={e.text}
                disabled
              />
              <Button
                variant="contained"
                sx={{ height: '7.5vh', bgcolor: 'red' }}
                onClick={() => { ExRemove(index); }}
              >
                Dele

              </Button>
            </Grid>
          ))}

          <Grid item xs={12} py={2} maxWidth="md">

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="discription"
              type="text"
              label=" Discription"
              placeholder=" Discription"
              name="discription"
              autoComplete="discription"
              error={discription}
              helperText={discriptionError}
            />
          </Grid>
          <Grid item xs={12} py={1}>
            <FormLabel>Resume</FormLabel>
            <IconButton
              className="text-center flex"
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="application/pdf"
                onChange={(e) => {
                  const fsize = parseFloat(e.target.files[0].size / 1024).toFixed(2);
                  if (fsize > 1024) {
                    toast.error('File too large!', {
                      position: 'top-right',
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'colored',
                    });
                  } else {
                    setPdf(e.target.files[0]);
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
                type="file"
              />

              <FileUpload />
              <Typography>Upload resume</Typography>
            </IconButton>
          </Grid>

          <Box sx={{ backgroundColor: '#ffc5c5', borderRadius: '3px', pl: 2 }}>
            <p style={{ color: 'red' }}>{totalRequired}</p>
          </Box>
          <Grid container spacing={2} py={2} sx={{ justifyContent: 'flex-end' }}>
            <Grid>
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
                POST
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
