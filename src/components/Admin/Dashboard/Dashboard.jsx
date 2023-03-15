/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  styled, createTheme, ThemeProvider, useTheme, alpha,
  experimentalStyled as styleds,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskIcon from '@mui/icons-material/Task';
import MessageIcon from '@mui/icons-material/Message';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Moment from 'react-moment';
import Swal2 from 'sweetalert2';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getDashboardData, AdminSideDashboardJob } from '../../../apis/AdminApi';

const Item = styleds(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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

export default function AdminDashboardCard() {
  const [modalDatas, setModalDatas] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [job, setJob] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (token) {
      (async function invoke() {
        await getDashboardData(token).then((res) => {
          setData(res);
        });
      }());
    }
  }, []);

  useEffect(() => {
    async function invoke() {
      await AdminSideDashboardJob(token).then((response) => {
        setJob(response);
      });
    }
    invoke();
  }, []);

  return (

    <Box sx={{ flexGrow: 1, marginLeft: '4rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'start', padding: '3vh' }}>
        <Typography
          component="h1"
          variant="h5"
        >
          Welcome to ADMIN
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Card
          sx={{
            m: 3, minWidth: 250, maxWidth: 310,
          }}
        >
          <CardMedia>
            <AccountCircle sx={{ height: 130, width: 250, mt: 1 }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Seekers
              {' = '}
              {data?.seekers}
            </Typography>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/admin/seeker')}>
              view
            </Button>
          </CardActions>
        </Card>
        <Card
          sx={{
            m: 3, minWidth: 250, maxWidth: 310,
          }}
        >
          <CardMedia>
            <WorkIcon sx={{ height: 130, width: 250, mt: 1 }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total JobPosts
              {' = '}
              {data?.jobs}
            </Typography>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/admin/jobs')}>
              view
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            m: 3, minWidth: 250, minHeight: 300, maxWidth: 310,
          }}
        >
          <CardMedia>
            <BusinessIcon sx={{ height: 130, width: 250, mt: 1 }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Companys
              {' = '}
              {data?.companys}
            </Typography>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/admin/company')}>
              view
            </Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            m: 3, minWidth: 250, minHeight: 300, maxWidth: 310,
          }}
        >
          <CardMedia>
            <AccountBoxIcon sx={{ height: 130, width: 250, mt: 1 }} />
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Recruiters
              {' = '}
              {data?.recruiters}
            </Typography>
            <Typography variant="body2" color="text.secondary" />
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/admin/recruiter')}>
              view
            </Button>
          </CardActions>
        </Card>

      </Grid>
      <Box sx={{ marginRight: '5rem' }}>
        <Typography
          component="h1"
          variant="h5"
        >
          Latest Jobs
        </Typography>
        <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NO</StyledTableCell>
                <StyledTableCell align="center">Company Name</StyledTableCell>
                <StyledTableCell align="center">Job Title</StyledTableCell>
                <StyledTableCell align="center">Posted On</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Salary Range</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job?.map((el, index) => (
                <StyledTableRow key={el?.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?.companyName?.companyName}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {el?.jobTitle}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">

                    <Moment format="DD/MM/YYYY" date={el?.createdAt} />

                  </StyledTableCell>
                  <StyledTableCell align="center">{el?.jobCategory.name}</StyledTableCell>
                  <StyledTableCell align="center">{el?.salaryRange}</StyledTableCell>

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
    </Box>
  );
}
