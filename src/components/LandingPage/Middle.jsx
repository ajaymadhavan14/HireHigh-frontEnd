import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function MiddleContainer() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ height: '45vh', textAlign: 'center', mt: 5 }}
        xs={12}
        lg={12}
      >

        <Typography sx={{ pt: 4, fontSize: '10vh', color: '#000DFF' }}>
          1000+
        </Typography>
        <Typography sx={{ fontSize: '5vh' }}>
          Browse From Our Top Jobs
        </Typography>

      </Box>
    </>
  );
}
