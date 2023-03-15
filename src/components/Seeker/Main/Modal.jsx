/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { Box } from '@mui/system';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  width: 500,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 4,
  p: 5,
};

export default function SeekerSideModal({ state, setModal }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModal(false);
  };
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    if (state) {
      handleOpen();
    }
    setData(state);
  }, []);
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Full details
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Full Name :</Typography>
              <Typography>{data?.userName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Email :</Typography>
              <Typography>{data?.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>PhoneNumnber :</Typography>
              <Typography>{data?.phoneNumber}</Typography>
            </Box>
            {data?.location && (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Location :</Typography>
              <Typography>{data?.location}</Typography>
            </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>WebSite :</Typography>
              <Typography>{data?.website}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>{data?.tagLine}</Typography>
            </Box>
            {/* <Box>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="pandata1a-content"
                          id="pandata1a-header"
                        >
                          <Typography>Qualification</Typography>
                        </AccordionSummary>
                        {data?.qualifications?.map((e, ind) => (
                          <AccordionDetails>
                            <Typography>
                              {ind + 1}
                              {' : '}
                              {e?.text}
                            </Typography>
                          </AccordionDetails>
                        ))}
                      </Accordion>
                    </Box> */}
            {/* <Box>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="pandata1a-content"
                          id="pandata1a-header"
                        >
                          <Typography>Experience</Typography>
                        </AccordionSummary>
                        {data?.experiances?.map((e, ind) => (
                          <AccordionDetails>
                            <Typography>
                              {ind + 1}
                              {' : '}
                              {e?.text}
                            </Typography>
                          </AccordionDetails>
                        ))}
                      </Accordion>
                    </Box> */}
            <Box sx={{ marginTop: '1rem' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="pandata1a-content"
                  id="pandata1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {data?.discription}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
