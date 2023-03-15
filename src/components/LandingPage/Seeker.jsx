import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function SeekerContainer() {
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: '#F1F5F9', width: '100%',
        }}
      >
        <Grid container>

          <Grid xs={12} sm={6}>
            <Box sx={{ align: 'center', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '10vh' }}>
                Find Your Next
              </Typography>
              <Typography sx={{ fontSize: '10vh' }}>
                Dream Job
              </Typography>
              <Typography>
                <Button variant="contained" onClick={() => navigate('/login')}>Click Here</Button>
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box sx={{ align: 'center' }}>
              <img
                src="/HH-B.png"
                alt="Loading..."
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
