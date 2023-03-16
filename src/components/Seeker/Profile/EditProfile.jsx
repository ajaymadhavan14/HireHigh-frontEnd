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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { IconButton } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { ColorRing, Dna } from 'react-loader-spinner';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';
import { getProfileData } from '../../../apis/SeekerApi';

const theme = createTheme();
export default function SeekerEditprofile() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(false);
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [headline, setHeadline] = useState(false);
  const [headlineError, setHeadlineError] = useState('');
  const [position, setPosition] = useState(false);
  const [positionError, setPositionError] = useState('');
  const [age, setAge] = useState(false);
  const [ageError, setAgeError] = useState('');
  const [qualification, setQualification] = useState();
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
  const [pdf, setPdf] = useState('');
  const [totalRequired, setTotalRequired] = useState('');

  const navigate = useNavigate();
  const [datas, setDatas] = useState({});
  const token = localStorage.getItem('userToken');
  const [refresh, setRefresh] = useState();
  const [qualifications, setQualifications] = useState([]);
  const [experiances, setExperiances] = useState([]);
  const [quali, setQualifi] = useState([]);
  const [experi, setExperi] = useState([]);
  const [addQuali, setAddQuali] = useState(false);
  const [addExperi, setAddExperi] = useState(false);
  // useEffect(() => {
  //   setQualifi([...quali, { text: qualification }]);
  //   setExperi([...experi, { text: experiance }]);
  // }, [qualification, experiance]);
  // console.log(qualification);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getProfileData(token).then((response) => {
          setDatas(response);
          setExperiances(response.experiances);
          setQualifications(response.qualifications);
        });
      }());
    } else {
      swal('Please Login');
      navigate('/login');
    }
  }, []);
  // pdf converted to base64
  const toBase64 = (image) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }).catch((err) => {
    navigate('/error-page');
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = new FormData(event.currentTarget);
    const pdfBase = await toBase64(pdf);
    let experiance;
    let qualification;
    if (experi.length === 0) {
      experiance = experiances;
    } else {
      experiance = experi;
    }
    if (quali.length === 0) {
      qualification = qualifications;
    } else {
      qualification = quali;
    }
    data = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
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
    if (data.position && data.headline && data.qualifications && data.experiances && data.firstName
      && data.discription && data.age && data.location && data.lastName && data.email
      && data.phoneNumber && data.salaryRange) {
      const regName = /^[a-zA-Z ]*$/;
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
                          navigate('/error-page');
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
                      axios.post('/api/edit_profile_post', data, { headers: { 'user-access-token': token } }).then((response) => {
                        if (response.data.status === 'success') {
                          navigate('/profile');
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
          setLastName(true);
          setLastNameError('Please enter valid Name');
        }
      } else {
        setFirstName(true);
        setFirstNameError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };

  const editQualification = (index) => {
    if (qualification !== '') {
      qualifications[index].text = qualification;
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
  };

  const editExperiance = (index) => {
    if (experiance !== '') {
      experiances[index].text = experiance;
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
  };
  const addQualification = () => {
    setQualifications([...qualifications,
      { text: qualification }]);
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
    setAddQuali(false);
  };
  const addExperiance = () => {
    setExperiances([...experiances, { text: experiance }]);
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
    setAddExperi(false);
  };
  const QuRemove = (index) => {
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
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={firstName}
                helperText={firstNameError}
                defaultValue={datas?.firstName}
                multiline
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
                defaultValue={datas?.lastName}
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} py={2}>

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
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="headline"
                type="text"
                id="headline"
                label="Headline"
                placeholder="a"
                error={headline}
                helperText={headlineError}
                defaultValue={datas?.headline}
                autoFocus
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="position"
                type="text"
                id="position"
                label="Position"
                error={position}
                helperText={positionError}
                defaultValue={datas?.position}
                autoFocus
                multiline
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                autoComplete="given-name"
                name="salaryRange"
                type="text"
                id="salaryRange"
                label="Expected Salary"
                error={salaryRange}
                helperText={salaryRangeError}
                defaultValue={datas?.salaryRange}
                multiline
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
                defaultValue={datas?.location}
                multiline
              />
            </Grid>
          </Grid>
          {qualifications?.map((el, index) => (
            <Grid item xs={12} py={2}>
              <TextField
                required
                fullWidth
                id="qualification"
                type="text"
                label="Qualification"
                name="qualification"
                autoComplete="qualification"
                error={qualification}
                helperText={qualificationError}
                onChange={(e) => setQualification(e.target.value)}
                defaultValue={el?.text}
                multiline
                autoFocus
                sx={{ width: '84%' }}
              />
              <Button
                onClick={() => { editQualification(index); }}
                variant="contained"
                sx={{ height: '7.5vh' }}
              >
                +

              </Button>
              <Button
                variant="contained"
                sx={{ height: '7.5vh', bgcolor: 'red', ':hover': { bgcolor: 'darkred' } }}
                onClick={() => { QuRemove(index); }}
              >
                X

              </Button>
            </Grid>
          ))}
          {addQuali
          && (
          <Grid item xs={12} py={2}>
            <TextField
              required
              fullWidth
              id="qualification"
              type="text"
              label="Qualification"
              name="qualification"
              autoComplete="qualification"
              error={qualification}
              helperText={qualificationError}
              onChange={(e) => setQualification(e.target.value)}
              multiline
              autoFocus
              sx={{ width: '92%' }}
            />
            <Button
              onClick={addQualification}
              variant="contained"
              sx={{ height: '7.5vh' }}
            >
              Add

            </Button>
          </Grid>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setAddQuali(true);
            }}
          >
            AddMore Qualification
          </Button>

          {experiances?.map((el, index) => (
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
                onChange={(e) => setExperiance(e.target.value)}
                defaultValue={el?.text}
                multiline
                sx={{ width: '84%' }}

              />
              <Button
                onClick={() => { editExperiance(index); }}
                variant="contained"
                sx={{ height: '7.5vh' }}
              >
                +

              </Button>
              <Button
                variant="contained"
                sx={{ height: '7.5vh', bgcolor: 'red', ':hover': { bgcolor: 'darkred' } }}
                onClick={() => { ExRemove(index); }}
              >
                X

              </Button>
            </Grid>
          ))}
          {addExperi
          && (
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
              onChange={(e) => setExperiance(e.target.value)}
              multiline
              sx={{ width: '92%' }}
            />
            <Button
              onClick={addExperiance}
              variant="contained"
              sx={{ height: '7.5vh' }}
            >
              okk

            </Button>
          </Grid>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setAddExperi(true);
            }}
          >
            AddMore Experiance
          </Button>

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
              defaultValue={datas?.discription}
              multiline
              autoFocus
            />
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
                defaultValue={datas?.age}
                autoFocus
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} sx={{ marginTop: '10px' }}>
              <img src={datas?.image} alt="...loading" style={{ width: '30vh', height: '25vh' }} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
              <FormLabel>Add New Resume</FormLabel>
              <IconButton
                className="text-center flex"
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{ marginTop: '10px', ':hover': { bgcolor: 'blue' } }}
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
                SUBMIT
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </ThemeProvider>
  );
}
