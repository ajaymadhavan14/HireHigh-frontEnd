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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getNotification, RecruiterSideJobAppliedList } from '../../../apis/RecruiterApi';
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

export default function NotificationCard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('recruiterToken');
  const { recruiter } = useSelector((state) => state.recruiterInfo);

  const [datas, setDatas] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getNotification(token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setDatas(res);
          }
        });
      }());
    }
  }, []);
  const {
    socket,
    sendNotification,
    recieveNotification,
    setRecieveNotification,
  } = useContext(AuthContext);

  useEffect(() => {
    socket.emit('new-user-add', recruiter?.id);

    socket.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [recruiter]);

  useEffect(() => {
    if (sendNotification !== null) {
      socket.emit('send-notification', sendNotification);
    }
  }, [sendNotification]);

  useEffect(() => {
    socket.on('recieve-notification', (data) => {
      setRecieveNotification(data);
    });
  }, []);
  useEffect(() => {
    if (
      recieveNotification !== null
        && recieveNotification?.recieverId === recruiter?.id
    ) {
      toast.info(`${recieveNotification?.notification}22222222`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [recieveNotification]);
  const usersList = async (id) => {
    if (token) {
      await RecruiterSideJobAppliedList(id, token).then((res) => {
        navigate('/recruiter/applied_users', { state: res });
      });
    } else {
      navigate('/recruiter/login');
    }
  };
  return (
    <Box>
      {noData === true ? (
        <Box>
          <img src="/nodata.jpg" alt="...loading" />
        </Box>
      )
        : (
          <Grid container spacing={3}>
            <ToastContainer />
            <Grid item xs={12} md={8} lg={9}>
              <Box>
                {datas?.map((el) => (
                  <Card sx={{ minWidth: 275, marginTop: '1rem' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography sx={{ fontSize: 24 }} gutterBottom>
                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography sx={{ fontSize: 24 }} gutterBottom>
                              Job Name :
                              {el?.jobId?.jobTitle}
                            </Typography>
                          </Box>
                        </Typography>
                        {/* <img src={el?.jobId?.image} style={{ height: '4rem', width: '5rem' }}
                   alt="" /> */}
                      </Box>
                      <Typography variant="h5" component="div">
                        {el?.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => usersList(el?.jobId?._id)}>Learn More</Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>

            </Grid>
            {/* <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        />
      </Grid> */}
            {/* <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
      </Grid> */}
          </Grid>
        )}

    </Box>

  );
}
