/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Moment from 'react-moment';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { element } from 'prop-types';
import { getSingleJobData, jobApply, AddNotification } from '../../../apis/SeekerApi';
import AuthContext from '../../../context/AppContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SingleJobView(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState({});
  const [cat, setCat] = useState([]);
  const [refresh, setRefresh] = useState();
  const token = localStorage.getItem('userToken');
  const userData = props?.user;
  const { user } = useSelector((state) => state.userInfo);
  const { sendNotification, setSendNotification } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getSingleJobData(state, token).then((response) => {
          setData(response.data);
          setCat(response.category);
        });
      }());
    } else {
      swal('Please Login');
      navigate('/login');
    }
  }, [refresh]);
  const apply = async (id, recruiterId) => {
    if (token) {
      await jobApply(id, userData, token).then(async (response) => {
        if (response.data.status === 'success') {
          await AddNotification({
            senderId: user.id, recieverId: recruiterId, jobId: id, content: `${user.username} Applied your job post`,
          }, token);
          setSendNotification({
            senderId: user.id, recieverId: recruiterId, jobId: id, content: `${user.username} Applied your job post`,
          });
          swal('success');
          setRefresh(!refresh);
        }
      });
    } else {
      swal('Please Login');
      navigate('/login');
    }
  };

  return (

    <Grid container spacing={3}>
      {/* Chart */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <img src={data?.image} alt="" style={{ width: '25vh' }} />
            <Box sx={{ marginLeft: '5vh' }}>
              <Typography component="h1" variant="h5">{data?.jobTitle}</Typography>
              <Typography color="text.secondary" mt={1}>
                Company :
                {data?.companyName?.companyName}
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Location :
                {data?.location}
              </Typography>
            </Box>
            {data?.users?.map((elem) => (elem?.userId === user?.id
             && (
             <Box sx={{ marginLeft: '17vh' }}>
               <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>Replay From Recruiter</Typography>
               <Typography sx={{ marginTop: '2vh' }}>
                 {elem?.comment}
                 {' for the job '}
               </Typography>
             </Box>
             )
            ))}
          </Box>

        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Typography component="h1" variant="h5">Job summary</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}>
          <Typography mb={1}>
            Published on :
            <Moment format="DD/MM/YYYY" date={data?.createdAt} />
          </Typography>
          <Typography mb={1}>
            Vaccancy  :
            {data?.vaccancy}
          </Typography>
          <Typography mb={1}>
            Salary  :
            {data?.salaryRange}
          </Typography>
          <Typography mb={1}>
            Location  :
            {data?.location}
          </Typography>
          <Typography mb={1}>
            work Type  :
            {data?.workPlace}
          </Typography>
        </Box>

      </Grid>
      {/* Recent Deposits */}
      {/* Recent Orders */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Job description</Typography>
              <Typography>{data?.jobDiscription}</Typography>
              <Typography>Calicut</Typography>
            </Box>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Responsibility</Typography>
              <Typography>{data?.responsibilities}</Typography>
              <Typography>Calicut</Typography>
            </Box>
            <Box sx={{ marginBottom: '5vh' }}>
              <Typography sx={{ marginBottom: '5vh' }} component="h1" variant="h5">Qualifications</Typography>
              <Typography>{data?.jobQualification}</Typography>
              <Typography>Calicut</Typography>
            </Box>
          </Box>
          {userData?.job?.some((element) => element?.jobId === data?._id)
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
                onClick={() => apply(data?._id, data?.recruiterId)}
                sx={{
                  ml: 1, backgroundColor: 'blue', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'green' },
                }}
              >
                Apply
              </Button>
            )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>

        <Box>
          {cat && cat?.map((el) => (
            <Card sx={{ minWidth: 275 }} key={el?.id}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row' }} key={el?.id}>
                <img src={el?.image} alt="" style={{ width: '20vh' }} />
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
                  {userData?.job?.some((element) => element?.jobId === el?._id)
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
                        onClick={() => apply(el?._id)}
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

    </Grid>
  );
}
