/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Box from '@mui/material/Box';
import {
  styled, createTheme, ThemeProvider, useTheme, alpha,
} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import { useEffect, useState, useContext } from 'react';
import swal from 'sweetalert';
import { CheckBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, FormGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  jobListSeekerSide, jobApply, getSerachJob, getFilterJob, AddNotification,
} from '../../../apis/SeekerApi';
import { getCategory } from '../../../apis/RecruiterApi';
import AuthContext from '../../../context/AppContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function JobCard(props) {
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const [noData, setNoData] = useState(false);
  const [jobCat, setJobCat] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobWork, setJobWork] = useState('');
  const { user } = useSelector((state) => state.userInfo);
  const { sendNotification, setSendNotification } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await jobListSeekerSide(token).then((res) => {
          setJobs(res);
        });
      }());
    } else {
      swal('Please Login');
      navigate('/login');
    }
  }, [refresh]);
  const users = props?.data;
  const apply = async (id, recruiterId) => {
    if (token) {
      await jobApply(id, user, token).then(async (response) => {
        if (response.data.status === 'success') {
          await AddNotification({
            senderId: user.id, recieverId: recruiterId, jobId: id, content: `${user.username} Applied your job post`,
          }, token);
          setSendNotification({
            senderId: user.id, recieverId: recruiterId, jobId: id, content: `${user.username} Applied your job post`,
          });
          swal('success');
          setNoData(false);
          setRefresh(!refresh);
        }
      });
    } else {
      swal('Please Login');
      navigate('/login');
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
      navigate('/login');
    }
  }, []);

  const searchJob = async (value) => {
    if (token) {
      await getSerachJob(value, token).then((res) => {
        if (res.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setJobs(res);
        }
      });
    } else {
      swal('Please Login');
      navigate('/login');
    }
  };
  const allData = { jobType, workPlace: jobWork, jobCategory: jobCat };

  useEffect(() => {
    const getJobType = async () => {
      allData.jobType = jobType;
      if (token) {
        await getFilterJob(allData, token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setJobs(res);
          }
        });
      } else {
        swal('Please Login');
        navigate('/login');
      }
    };
    if (jobType !== '') {
      getJobType();
    }
  }, [jobType]);

  useEffect(() => {
    const getWorkPlacetype = async () => {
      allData.workPlace = jobWork;
      if (token) {
        await getFilterJob(allData, token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setJobs(res);
          }
        });
      } else {
        swal('Please Login');
        navigate('/login');
      }
    };
    if (jobWork !== '') {
      getWorkPlacetype();
    }
  }, [jobWork]);

  useEffect(() => {
    const getCategoryFor = async () => {
      allData.jobCategory = jobCat;
      if (token) {
        await getFilterJob(allData, token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setJobs(res);
          }
        });
      } else {
        swal('Please Login');
        navigate('/login');
      }
    };
    if (jobCat !== '') {
      getCategoryFor();
    }
  }, [jobCat]);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      {noData === true ? (
        <Grid item xs={12} md={8} lg={9}>
          <Box>
            <img src="/nodata.jpg" alt="...loading" />
          </Box>
        </Grid>
      )
        : (
          <Grid item xs={12} md={8} lg={9}>
            {/* <JobCardSearch newData={jobData} data={user} /> */}
            <Box>
              {jobs?.map((el) => (
                <Card sx={{ minWidth: 275 }} key={el?.id}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'row' }} key={el?.id}>
                    <img src={el?.image} alt="...loading" style={{ width: '20vh' }} />
                    <Box sx={{ marginLeft: '8vh', alignSelf: 'center' }}>
                      <Box sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h5" component="div">
                          {el?.jobTitle}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {el?.companyName?.companyName}
                        </Typography>
                        <Typography variant="body2">
                          {el?.jobType}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ alignSelf: 'center', ml: 'auto' }}>
                      {users?.job?.some((element) => element?.jobId === el?._id)
                        ? (
                          <Button
                        // eslint-disable-next-line no-underscore-dangle
                    // onClick={() => apply(el?._id)}
                            variant="contained"
                            sx={{
                              backgroundColor: 'green', color: '#fff', fontWeight: '800', pointerEvents: 'none',
                            }}
                          >
                            Applied
                          </Button>
                        )

                        : (
                          <Button
                        // eslint-disable-next-line no-underscore-dangle
                            onClick={() => apply(el?._id, el?.recruiterId)}
                            sx={{
                              ml: 1, backgroundColor: 'blue', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'green' },
                            }}
                          >
                            Apply
                          </Button>
                        )}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => navigate('/job_view', { state: el?._id })}>full details</Button>
                  </CardActions>
                </Card>
              ))}
            </Box>

          </Grid>
        )}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => searchJob(e.target.value)}
                // onKeyUp={() => {
                //   setOpenBox(true);
                // }}
                onFocus={() => {
                  setRefresh(!refresh);
                }}
              />
            </Search>
          </Box>
          <Box sx={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                name="category"
                onChange={(e) => {
                  setJobCat(e.target.value);
                }}
              >

                {cat?.map((el) => (
                  <MenuItem value={el?._id}>{el?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="jobType"
                label="JobType"
                name="jobType"
                onChange={(e) => setJobType(e.target.value)}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginTop: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">WorkPlace Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="workPlace"
                label="WorkPlace Type"
                name="workPlace"
                onChange={(e) => {
                  setJobWork(e.target.value);
                }}
              >
                <MenuItem value="On-site">On-site</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Grid>
      {/* <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
      </Grid> */}
    </Grid>

  );
}
