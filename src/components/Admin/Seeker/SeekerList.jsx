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
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminGetUsers, seekerActivated, seekerBlocked } from '../../../apis/AdminApi';

export default function SeekerList() {
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
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await AdminGetUsers(token).then((response) => {
          setUsers(response);
        });
      }());
    } else {
      navigate('/admin/login');
    }
  }, [refresh]);

  const blocked = async (userId) => {
    if (token) {
      await seekerBlocked(userId, token);
      setRefresh(!refresh);
    } else {
      navigate('/admin/login');
    }
  };

  const actived = async (userId) => {
    if (token) {
      await seekerActivated(userId, token);
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
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">E-MAIL</StyledTableCell>
                <StyledTableCell align="center">PHONE NO</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <StyledTableRow key={user?.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {`${user?.firstName} ${user?.lastName}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user?.email}</StyledTableCell>

                  <StyledTableCell align="center">{user?.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user?.isActive
                      ? (
                        <Button
                        // eslint-disable-next-line no-underscore-dangle
                          onClick={() => blocked(user?._id)}
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
                          onClick={() => actived(user?._id)}
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
