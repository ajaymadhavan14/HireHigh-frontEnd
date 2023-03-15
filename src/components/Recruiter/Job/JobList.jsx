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
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  RecruiterSideJobList, RecruiterJobDele, RecruiterJobEdit, RecruiterSideJobAppliedList,
} from '../../../apis/RecruiterApi';

export default function RecruiterJobList() {
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
  const token = localStorage.getItem('recruiterToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
      // const id = props.id._id;
        await RecruiterSideJobList(token).then((response) => {
          if (response.status === 'failed') {
            navigate('/recruiter/add_job');
          } else {
            setJob(response.data);
          }
        });
      }());
    } else {
      navigate('/recruiter/login');
    }
  }, [refresh]);

  const BlockJob = async (id) => {
    if (token) {
      await RecruiterJobDele(id, token).then((response) => {
        if (response.data.status === 'success') {
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
          swal('OOPS', response.data.message, 'error');
        }
      });
    } else {
      navigate('/recruiter/login');
    }
  };

  const editJob = async (id) => {
    if (token) {
      await RecruiterJobEdit(id, token).then((response) => {
        navigate('/recruiter/edit_jobs', { state: response });
      });
    } else {
      navigate('/recruiter/login');
    }
  };

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
      <ToastContainer />
      <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NO</StyledTableCell>
              <StyledTableCell align="center">Job Title</StyledTableCell>
              <StyledTableCell align="center">Posted On</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Company Status</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Users</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {job?.map((el, index) => (
              <StyledTableRow key={el?.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {el?.jobTitle}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">

                  <Moment format="DD/MM/YYYY" date={el?.createdAt} />

                </StyledTableCell>
                <StyledTableCell align="center">{el?.jobCategory?.name}</StyledTableCell>
                <StyledTableCell align="center">{el?.companyOk ? 'Approved' : 'NotApproved'}</StyledTableCell>
                <StyledTableCell align="center">{el?.salaryRange}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'blue' }} onClick={() => editJob(el?._id)}>
                    Edit
                  </Button>

                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'blue' }} onClick={() => usersList(el?._id)}>
                    view
                  </Button>

                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  <Button variant="contained" sx={{ bgcolor: 'red' }}
                  onClick={() => deleteJob(el?._id)}>
                    Dele
                  </Button>

                </StyledTableCell> */}
                <StyledTableCell align="center">
                  {el?.isActive
                    ? (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={() => BlockJob(el?._id)}
                        sx={{
                          backgroundColor: '#03a903', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'blue' },
                        }}
                      >
                        Active
                      </Button>
                    )
                    : (
                      <Button
                        // eslint-disable-next-line no-underscore-dangle
                        // onClick={() => actived(el?._id)}
                        sx={{
                          ml: 1, backgroundColor: 'red', fontWeight: '800',
                        }}
                        disabled
                      >
                        Blocked
                      </Button>
                    )}
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
