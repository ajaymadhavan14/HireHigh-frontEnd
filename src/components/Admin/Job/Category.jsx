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
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import swal from 'sweetalert';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import {
  AdminSideCategoryShow,
  CategoryDelete,
} from '../../../apis/AdminApi';
import axios from '../../../axios/axios';

export default function AdminJobCategory() {
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

  const [job, setJob] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [category, setCategory] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      category: data.get('category'),

    };

    if (data.category) {
      axios.post('/api/admin/add_category', data, { headers: { 'admin-access-token': token } }).then((response) => {
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
      setCategory(true);
      setCategoryError('please enter category name');
    }
  };

  useEffect(() => {
    async function invoke() {
      await AdminSideCategoryShow(token).then((response) => {
        setJob(response);
      });
    }
    invoke();
  }, [refresh]);

  const deleteCat = async (id) => {
    await CategoryDelete(id, token).then((response) => {
      if (response.data.status === 'success') {
        swal('success');
        setRefresh(!refresh);
      } else {
        swal('OOPS', response.data.message, 'error');
      }
    });
  };

  //   const blocked = async (Id) => {
  //     await JobBlocked(Id);
  //     setRefresh(!refresh);
  //   };

  //   const actived = async (Id) => {
  //     await JobActivated(Id);
  //     setRefresh(!refresh);
  //   };

  return (
    <Container component="main" maxWidth="xl" sx={{ marginTop: '2vh' }}>
      <FormLabel>Categorys</FormLabel>
      <Box>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Grid container spacing={2} py={2}>
            <ToastContainer />

            <Grid item xs={12} sm={6}>
              <TextField
                name="category"
                type="text"
                required
                fullWidth
                id="category"
                label="Job Category"
                error={category}
                helperText={categoryError}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '1.5vh' }}
              >
                Add Category

              </Button>

            </Grid>
            {/* <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          </Box> */}
          </Grid>

        </Box>
        <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO</StyledTableCell>
                <StyledTableCell align="center">Category Id</StyledTableCell>
                <StyledTableCell align="center">Category Name</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>

                {/* <StyledTableCell align="center">Job Title</StyledTableCell>
                <StyledTableCell align="center">Posted On</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Salary Range</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell> */}

              </TableRow>
            </TableHead>
            <TableBody>
              {job?.map((el, index) => (
                <StyledTableRow key={el?.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?._id}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" sx={{ bgcolor: 'red' }} onClick={() => deleteCat(el?._id)}>
                      Dele
                    </Button>

                  </StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      </Box>
    </Container>
  );
}
