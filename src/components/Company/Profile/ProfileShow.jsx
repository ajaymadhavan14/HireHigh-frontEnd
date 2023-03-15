/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../../apis/CompanyApi';

export default function CompanyProfile() {
  const theme = createTheme();
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('companyToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getProfile(token).then((response) => {
          setCompany(response);
        });
      }());
    } else {
      navigate('/company/login');
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}

          <Grid item xs={12} md={4} lg={3} sx={{ }}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: '3vh',
              }}
              >

                <img style={{ width: '20vh', height: '25vh' }} src={company?.image} alt="" />

                <Typography sx={{ fontSize: '3vh', fontWeight: '500' }}>{company?.userName}</Typography>

              </Box>
              <Box sx={{ textAlignLast: 'center' }}>
                {/* <Button variant="contained" sx={{ mt: '5vh', width: '10vh' }} onClick={() =>
                 navigate('/company/edit_profile')}>
                  Edit
                </Button> */}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: '3vh' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Company ID</FormLabel>
                    <Typography pt={1}>

                      #
                      {company?._id}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Company Name</FormLabel>
                    <Typography pt={1}>

                      {company?.companyName}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Phone Number</FormLabel>
                    <Typography pt={1}>

                      {company?.phoneNumber}

                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10vh',
                }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Email</FormLabel>
                    <Typography pt={1}>

                      {company?.email}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <FormLabel>Website</FormLabel>
                    <Typography pt={1}>

                      {company?.website}

                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormLabel>Location</FormLabel>
                    <Typography pt={1}>

                      {company?.location}

                    </Typography>
                  </Box>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10vh' }}>
                  <FormLabel>TagLine</FormLabel>
                  <Typography pt={1}>
                    {company?.tagLine}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Box mt={4}>
                <FormLabel>Discription</FormLabel>
                <Typography>{company?.discription}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  );
}
