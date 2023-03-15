/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { jobApply, applyedJobsSeeker } from '../../../apis/SeekerApi';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function JobCardApplied(props) {
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    if (token) {
      (async function invoke() {
        await applyedJobsSeeker(token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
            // navigate('/jobs');
          } else {
            setNoData(false);
            setJobs(res);
          }
        });
      }());
    } else {
      swal('Please Login');
      navigate('/login');
    }
  }, [refresh]);
  const user = props?.data;
  const apply = async (id) => {
    if (token) {
      await jobApply(id, user, token).then((response) => {
        if (response.data.status === 'success') {
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
    <Box>
      {noData ? (
        <Box>
          <img src="/nodata.jpg" alt="...loading" />
        </Box>
      )
        : (
          <Box>
            {jobs.map((el) => (
              <Card sx={{ minWidth: 275 }} key={el?.id}>
                <CardContent sx={{ display: 'flex', flexDirection: 'row' }} key={el?.id}>
                  <img src={el?.jobId?.image} alt="...loading" style={{ width: '20vh' }} />
                  <Box sx={{ marginLeft: '8vh', alignSelf: 'center' }}>
                    <Box sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="h5" component="div">
                        {el?.jobId?.jobTitle}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {el?.jobId?.companyName?.companyName}
                      </Typography>
                      <Typography variant="body2">
                        {el?.jobId?.jobType}
                      </Typography>
                    </Box>
                  </Box>
                  {el?.comment
            && (
            <Box sx={{ marginLeft: '15vh' }}>
              <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>Replay</Typography>
              <Typography sx={{ marginTop: '2vh' }}>
                {el?.comment}
                {' for the job '}
              </Typography>
            </Box>
            )}
                  <Box sx={{ alignSelf: 'center', ml: 'auto' }}>
                    {user.job.some((element) => element.jobId === el.jobId?._id)
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
                    // onClick={() => apply(el?._id)}
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
                  <Button size="small" onClick={() => navigate('/job_view', { state: el?.jobId?._id })}>full details</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
    </Box>
  );
}
