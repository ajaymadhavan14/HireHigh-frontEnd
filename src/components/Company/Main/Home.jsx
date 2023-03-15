/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  styled, createTheme, ThemeProvider, useTheme,
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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TaskIcon from '@mui/icons-material/Task';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import axios from '../../../axios/axios';
import { companyDetails } from '../../../redux/company';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export default function CompanyHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch(companyDetails);
  useEffect(() => {
    const token = localStorage.getItem('companyToken');
    if (token) {
      axios.get('/api/company/isCompanyAuth', {
        headers: { 'company-access-token': token },
      }).then((response) => {
        if (!response.data.auth) {
          if (response.data.status === 'blocked') {
            swal('Your profile blocked');
            navigate('/');
          } else {
            navigate('/company/login');
          }
        } else {
          dispatch(companyDetails(response.data));
        }
      }).catch((err) => console.log(err));
    } else {
      navigate('/company/login');
    }
  }, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { company } = useSelector((state) => state.companyInfo);

  const LogOut = () => {
    Swal2.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f04f4f',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('companyToken');
        // Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        // )
        navigate('/company/login');
      }
    });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              HIREHIGH
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>

            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'last',
                  px: 2.5,
                }}
                onClick={() => navigate('/company/home')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <InboxIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'last',
                  px: 2.5,
                }}
                onClick={() => navigate('/company/jobs')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <NoteAddIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Jobs</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'last',
                  px: 2.5,
                }}
                onClick={() => navigate('/company/notification')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <NotificationsIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Notifications</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'last',
                  px: 2.5,
                }}
                onClick={() => navigate('/company/profile')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <AccountBoxIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Profile</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'last',
                  px: 2.5,
                }}
                onClick={LogOut}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <LogoutIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: () => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h1 style={{ fontSize: '8rem', fontWeight: 900 }}>
                    Welcome to
                    {' '}
                    {company?.username}

                  </h1>
                </Paper>
              </Grid>
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }} />
              </Grid> */}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
