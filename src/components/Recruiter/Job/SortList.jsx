/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { RecruiterComment, getUserSortedList } from '../../../apis/RecruiterApi';

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

export default function RecruiterJobSortedList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const { state } = useLocation();
  // const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [noData, setNoData] = useState(false);
  const token = localStorage.getItem('recruiterToken');
  const navigate = useNavigate();

  const handleChangeComment = async (id, event) => {
    const comment = { comment: event.target.value, userId: id, jobId: state._id };
    await RecruiterComment(token, comment).then((response) => {
      if (response.status === 'success') {
        toast.success('🦄 Wow so easy!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setRefresh(!refresh);
      } else {
        swal('OOPS', response.message, 'error');
      }
    });
  };

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getUserSortedList(token).then((res) => {
          if (res.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setJob(res);
          }
        });
      }());
    } else {
      navigate('/recruiter/login');
    }
  }, [refresh]);

  // const editJob = async (id) => {
  //   await RecruiterJobEdit(id, token).then((response) => {
  //     navigate('/recruiter/edit_jobs', { state: response });
  //   });
  // };

  return (
    <Box>
      {noData ? (
        <Box>
          <img src="/nodata.jpg" alt="...loading" />
        </Box>
      )
        : (
          <Box>
            <ToastContainer />
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">NO</StyledTableCell>
                    <StyledTableCell align="center">Job Name</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Phone NUmber</StyledTableCell>
                    <StyledTableCell align="center">view</StyledTableCell>
                    <StyledTableCell align="center">Comment</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job?.map((ele) => (
                    ele?.users?.map((el, index) => (
                      <StyledTableRow key={el?.userId?.id}>
                        <StyledTableCell align="center" component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">
                          {ele?.jobTitle}
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th" scope="row">
                          {`${el?.userId?.firstName} ${el?.userId?.lastName}`}
                        </StyledTableCell>

                        <StyledTableCell align="center">{el?.userId?.email}</StyledTableCell>
                        <StyledTableCell align="center">{el?.userId?.phoneNumber}</StyledTableCell>
                        <StyledTableCell align="center">
                          <Button onClick={handleOpen} variant="contained">Details</Button>
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
                                  <Typography>{`${el?.userId?.firstName} ${el?.userId?.lastName}`}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Typography>Email :</Typography>
                                  <Typography>{el?.userId?.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Typography>PhoneNumnber :</Typography>
                                  <Typography>{el?.userId?.phoneNumber}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Typography>Location :</Typography>
                                  <Typography>{el?.userId?.location}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Typography>Position :</Typography>
                                  <Typography>{el?.userId?.position}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Typography>HeadLine :</Typography>
                                  <Typography>{el?.userId?.headline}</Typography>
                                </Box>
                                <Box>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>Qualification</Typography>
                                    </AccordionSummary>
                                    {el?.userId?.qualifications?.map((element, ind) => (
                                      <AccordionDetails>
                                        <Typography>
                                          {ind + 1}
                                          {' : '}
                                          {element?.text}
                                        </Typography>
                                      </AccordionDetails>
                                    ))}
                                  </Accordion>
                                </Box>
                                <Box>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>Experience</Typography>
                                    </AccordionSummary>
                                    {el?.userId?.experiances?.map((element, ind) => (
                                      <AccordionDetails>
                                        <Typography>
                                          {ind + 1}
                                          {' : '}
                                          {element?.text}
                                        </Typography>
                                      </AccordionDetails>
                                    ))}
                                  </Accordion>
                                </Box>
                                <Box>
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography>Description</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography>
                                        {el?.userId?.discription}
                                      </Typography>
                                    </AccordionDetails>
                                  </Accordion>
                                </Box>
                              </Box>
                            </Box>
                          </Modal>

                        </StyledTableCell>
                        {el?.comment
                          ? (
                            <StyledTableCell>
                              <Typography sx={{ marginLeft: '2rem' }}>{el?.comment}</Typography>
                            </StyledTableCell>
                          )
                          : (
                            <StyledTableCell>

                              <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-label">Comment</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  onChange={(e) => handleChangeComment(el?.userId?._id, e)}
                                >
                                  <MenuItem value="Good">Good</MenuItem>
                                  <MenuItem value="Maybe">Maybe</MenuItem>
                                  <MenuItem value="Notfit">NotFit</MenuItem>
                                </Select>
                              </FormControl>

                            </StyledTableCell>
                          ) }

                      </StyledTableRow>
                    ))
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
    </Box>
  );
}
