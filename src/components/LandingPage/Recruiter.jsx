import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function RecruiterContainer() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#F1F5F9', width: '100%',
        }}
        xs={12}
        lg={12}
      >
        <Grid container>
          <Grid xs={12} sm={6}>
            <Box sx={{ alignSelf: 'center', textAlign: 'center' }}>
              <img
                src="/HH-B-R.png"
                alt="Loading..."
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={6}>

            <Box sx={{ alignSelf: 'center', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '3rem' }}>
                We Build Lasting
                <br />
                Relationships Between
                <br />
                Candidates & Businesses
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <Button variant="contained" onClick={() => navigate('/recruiter/login')}>HR Login</Button>
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => navigate('/company/login')}>Company Login</Button>
              </Typography>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
