/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CompanyJobs, jobPostApproval, jobPostBlock } from '../../../apis/CompanyApi';

export default function CompanyJobList() {
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
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [noData, setNoData] = useState(false);
  const token = localStorage.getItem('companyToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await CompanyJobs(token).then((response) => {
          if (response?.job?.length === 0) {
            setNoData(true);
          } else {
            setNoData(false);
            setJob(response?.job);
          }
        });
      }());
    } else {
      navigate('/company/login');
    }
  }, [refresh]);
  const Activated = async (id) => {
    if (token) {
      await jobPostApproval(id, token).then((response) => {
        if (response.status === 'success') {
          toast.success('Job Post Approved!', {
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
    } else {
      navigate('/recruiter/login');
    }
  };

  const Blocked = async (id) => {
    if (token) {
      await jobPostBlock(id, token).then((response) => {
        if (response.status === 'success') {
          toast.success('Job Post Blocked!', {
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
    } else {
      navigate('/recruiter/login');
    }
  };

  return (
    <Box>
      {noData
        ? (
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
                    <StyledTableCell align="center">Job Title</StyledTableCell>
                    <StyledTableCell align="center">Hr Name</StyledTableCell>
                    <StyledTableCell align="center">Posted On</StyledTableCell>
                    <StyledTableCell align="center">Salary</StyledTableCell>
                    <StyledTableCell align="center">JobType</StyledTableCell>
                    <StyledTableCell align="center">WorkPlace</StyledTableCell>
                    <StyledTableCell align="center">Company Approval</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job?.map((el, index) => (
                    <StyledTableRow key={el?.jobId?.id}>
                      <StyledTableCell align="center" component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {el?.jobId?.jobTitle}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">
                        {el?.name}
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th" scope="row">

                        <Moment format="DD/MM/YYYY" date={el?.jobId?.createdAt} />

                      </StyledTableCell>
                      <StyledTableCell align="center">{el?.jobId?.salaryRange}</StyledTableCell>
                      <StyledTableCell align="center">{el?.jobId?.jobType}</StyledTableCell>
                      <StyledTableCell align="center">{el?.jobId?.workPlace}</StyledTableCell>

                      <StyledTableCell align="center">
                        {el?.jobId?.companyOk
                          ? (
                            <Button
                              sx={{
                                backgroundColor: 'red',
                                color: '#fff',
                                fontWeight: '800',
                                ':hover': { backgroundColor: 'darkred' },
                              }}
                              onClick={() => Blocked(el?.jobId?._id)}
                            >
                              Disable
                            </Button>
                          )
                          : (
                            <Button
                              variant="contained"
                              sx={{
                                ml: 1, backgroundColor: 'blue', fontWeight: '800', ':hover': { backgroundColor: 'green' },

                              }}
                              onClick={() => Activated(el?.jobId?._id)}
                            >
                              Approved
                            </Button>
                          )}
                      </StyledTableCell>

                      {/* <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'blue' }}
                   onClick={() => editJob(el?._id)}>
                    Edit
                  </Button>

                </StyledTableCell> */}
                      {/* <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'blue' }}
                   onClick={() => usersList(el?._id)}>
                    view
                  </Button>

                </StyledTableCell> */}
                      {/* <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'red' }}
                  onClick={() => deleteJob(el?._id)}>
                    Dele
                  </Button>

                </StyledTableCell> */}
                      {/* <StyledTableCell align="center">
                  {el?.isActive
                    ? (
                      <Button
                        onClick={() => BlockJob(el?._id)}
                        sx={{
                          backgroundColor: '#03a903', color: '#fff',
                          fontWeight: '800', ':hover': { backgroundColor: 'blue' },
                        }}
                      >
                        Active
                      </Button>
                    )
                    : (
                      <Button
                        sx={{
                          ml: 1, backgroundColor: 'red', fontWeight: '800',
                        }}
                        disabled
                      >
                        Blocked
                      </Button>
                    )}
                </StyledTableCell> */}

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
    </Box>

  );
}
