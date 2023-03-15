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
import Container from '@mui/material/Container';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdminGetRecruiters, recruiterActivated, recruiterBlocked } from '../../../apis/AdminApi';

export default function RecruiterList() {
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

  const [recruiter, setRecruiter] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await AdminGetRecruiters(token).then((response) => {
          setRecruiter(response);
        });
      }());
    } else {
      navigate('/admin/login');
    }
  }, [refresh]);

  const blocked = async (recruiterId) => {
    if (token) {
      await recruiterBlocked(recruiterId, token);
      setRefresh(!refresh);
    } else {
      navigate('/admin/login');
    }
  };

  const actived = async (recruiterId) => {
    if (token) {
      await recruiterActivated(recruiterId, token);
      setRefresh(!refresh);
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ marginTop: '3vh' }}>
      <Box>
        <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO</StyledTableCell>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">E-MAIL</StyledTableCell>
                <StyledTableCell align="center">PHONE NO</StyledTableCell>
                <StyledTableCell align="center">Website</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiter?.map((el, index) => (
                <StyledTableRow key={el?.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?.userName}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?.companyName?.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{el?.email}</StyledTableCell>

                  <StyledTableCell align="center">{el?.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center">{el?.website}</StyledTableCell>
                  <StyledTableCell align="center">
                    {el?.isActive
                      ? (
                        <Button
                        // eslint-disable-next-line no-underscore-dangle
                          onClick={() => blocked(el?._id)}
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
                          onClick={() => actived(el?._id)}
                          sx={{
                            ml: 1, backgroundColor: 'red', color: '#fff', fontWeight: '800', ':hover': { backgroundColor: 'blue' },
                          }}
                        >
                          Block
                        </Button>
                      )}
                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
