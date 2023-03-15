/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { ColorRing, Dna } from 'react-loader-spinner';
import { storage } from '../../../firebase/Config';
import axios from '../../../axios/axios';
import { getCategory, getCompanyData, AddNotification } from '../../../apis/RecruiterApi';
import AuthContext from '../../../context/AppContext';

const theme = createTheme();
export default function RecruiterJobPost() {
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState(false);
  const [jobTitleError, setJobTitleError] = useState('');
  const [companyName, setCompanyName] = useState(false);
  const [companyNameError, setCompanyNameError] = useState('');
  const [jobCategory, setJobCategory] = useState(false);
  const [jobCategoryError, setJobCategoryError] = useState('');
  const [workPlace, setWorkPlace] = useState(false);
  const [workPlaceError, setWorkPlaceError] = useState('');
  const [jobQualification, setJobQualification] = useState(false);
  const [jobQualificationError, setJobQualificationError] = useState('');
  const [jobDiscription, setJobDiscription] = useState(false);
  const [jobDiscriptionError, setJobDiscriptionError] = useState('');
  const [responsibilities, setResponsibilities] = useState(false);
  const [responsibilitiesError, setResponsibilitiesError] = useState('');
  const [image, setImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [salaryRange, setSalaryRange] = useState(false);
  const [salaryRangeError, setSalaryRangeError] = useState('');
  const [jobType, setJobType] = useState(false);
  const [jobTypeError, setJobTypeError] = useState('');
  const [location, setLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [vaccancy, setVaccancy] = useState(false);
  const [vaccancyError, setVaccancyError] = useState('');
  const [totalRequired, setTotalRequired] = useState('');
  const [company, setCompany] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('recruiterToken');
  const { recruiter } = useSelector((state) => state.recruiterInfo);
  const { sendNotification, setSendNotification } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let data = new FormData(event.currentTarget);
    data = {
      jobTitle: data.get('jobTitle'),
      workPlace: data.get('workPlace'),
      jobQualification: data.get('jobQualification'),
      jobDiscription: data.get('jobDiscription'),
      responsibilities: data.get('responsibilities'),
      salaryRange: data.get('salaryRange'),
      jobType: data.get('jobType'),
      jobCategory: data.get('jobCategory'),
      image: data.get('image'),
      location: data.get('location'),
      vaccancy: data.get('vaccancy'),
      companyName: company?.companyName?._id,
    };
    if (data.companyName && data.jobTitle && data.workPlace && data.jobQualification
      && data.jobDiscription && data.jobCategory && data.location && data.vaccancy
         && data.responsibilities && data.salaryRange && data.jobType && data.image) {
      const regName = /^[a-zA-Z ]*$/;
      setTotalRequired('');
      if (regName.test(data.jobTitle)) {
        setJobTitle(false);
        setJobTitleError('');
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
            const imageRef = ref(storage, `/jobPost/${dirs}${rand}_${image?.name}`);
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
          axios.post('/api/recruiter/add-job', data, { headers: { 'recruiter-access-token': token } }).then(async (response) => {
            if (response.data.status === 'success') {
              await AddNotification({
                senderId: recruiter.id, recieverId: company?.companyName?._id, jobId: response.data.id, content: `${recruiter.username} Add a job Post`,
              }, token);
              setSendNotification({
                senderId: recruiter.id, recieverId: company?.companyName?._id, jobId: response.data.id, content: `${recruiter.username} Add a job Post`,
              });
              navigate('/recruiter/jobs');
            } else {
              swal('OOPS', response.data.message, 'error');
            }
          });
        } else {
          navigate('/recruiter/login');
        }
      } else {
        setJobTitle(true);
        setJobTitleError('Please enter valid Name');
      }
    } else {
      setTotalRequired('Please enter your Details');
    }
  };
  const [cat, setCat] = useState([]);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        const res = await getCategory(token);
        setCat(res);
      }());
    } else {
      swal('Please Login');
      navigate('/recruiter/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getCompanyData(token).then((res) => {
          setCompany(res);
        });
      }());
    } else {
      swal('Please Login');
      navigate('/recruiter/login');
    }
  }, []);

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
              Post a Job
            </Typography>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="jobTitle"
                type="text"
                required
                fullWidth
                id="jobTitle"
                label="Job Title"
                error={jobTitle}
                helperText={jobTitleError}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                required
                fullWidth
                id="companyName"
                value={company?.companyName?.companyName}
                error={companyName}
                helperText={companyNameError}
              />

            </Grid>
          </Grid>

          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="jobCategory"
                  label="Category"
                  error={jobCategory}
                  helperText={jobCategoryError}
                >
                  {cat.map((el) => (
                    <MenuItem value={el?._id}>{el?.name}</MenuItem>
                  ))}

                </Select>

              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                required
                fullWidth
                id="workPlace"
                label="WorkPlace Type"
                name="workPlace"
                autoComplete="workPlace"
                error={workPlace}
                helperText={workPlaceError}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">WorkPlace Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="workPlace"
                  label="WorkPlace Type"
                  name="workPlace"
                >
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">
            <FormLabel>Job Discription</FormLabel>

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="jobDiscription"
              type="text"
              label="Job Discription"
              placeholder="Job Discription"
              name="jobDiscription"
              autoComplete="jobDiscription"
              error={jobDiscription}
              helperText={jobDiscriptionError}
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">
            <FormLabel>Job Qualification</FormLabel>

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="jobQualification"
              type="text"
              label="Job Qualification"
              placeholder="Job Qualification"
              name="jobQualification"
              autoComplete="jobQualification"
              error={jobQualification}
              helperText={jobQualificationError}
            />
          </Grid>
          <Grid item xs={12} py={2} maxWidth="md">
            <FormLabel>Responsibilities</FormLabel>

            <TextareaAutosize
              style={{ resize: 'vertical', width: '100%' }}
              minRows={4}
              required
              fullWidth
              id="responsibilities"
              type="text"
              label="Responsibilities"
              placeholder="Responsibilities"
              name="responsibilities"
              autoComplete="responsibilities"
              error={responsibilities}
              helperText={responsibilitiesError}
            />
          </Grid>
          <Grid container spacing={2} py={2}>

            <Grid item xs={12} sm={6}>
              {/* <TextField
                required
                fullWidth
                id="jobType"
                label="Job Type"
                name="jobType"
                autoComplete="jobType"
                error={jobType}
                helperText={jobTypeError}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="jobType"
                  label="JobType"
                  name="jobType"
                >

                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="salaryRange"
                label="Salary Range"
                type="salaryRange"
                id="salaryRange"
                autoComplete="salaryRange"
                error={salaryRange}
                helperText={salaryRangeError}
              />
            </Grid>

          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="vaccancy"
                type="number"
                label="Vaccancy"
                name="vaccancy"
                autoComplete="vaccancy"
                error={vaccancy}
                helperText={vaccancyError}
              />
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
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
              <FormLabel>Post Logo</FormLabel>
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
            <Grid item xs={12} sm={6} />
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
