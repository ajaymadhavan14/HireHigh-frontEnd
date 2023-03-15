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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BusinessIcon from '@mui/icons-material/Business';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal2 from 'sweetalert2';
import axios from '../../../axios/axios';
import { adminDetails } from '../../../redux/admin';
import SeekerList from '../Seeker/SeekerList';

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

function AdminHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch(adminDetails);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (token) {
      axios.get('/api/admin/isAdminAuth', {
        headers: { 'admin-access-token': token },
      }).then((response) => {
        if (!response.data.auth) {
          navigate('/admin/login');
        } else {
          dispatch(adminDetails(response.data));
        }
      });
    } else {
      navigate('/admin/login');
    }
  }, []);
  const { admin } = useSelector((state) => state.adminInfo);

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
        localStorage.removeItem('adminToken');
        // Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        // )
        navigate('/admin/login');
      }
    });
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              bgcolor: '#6096B4',
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
            <Typography variant="h6" noWrap component="div">
              {admin?.username}
            </Typography>
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
                onClick={() => navigate('/admin/home')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}

                >
                  <DashboardIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Dashboard</ListItemText>
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

              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <AccountBoxIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Seekers</ListItemText>
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
                onClick={() => navigate('/admin/recruiter')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <BusinessIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Recruiters</ListItemText>
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
                onClick={() => navigate('/admin/category')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',

                  }}

                >
                  <CategoryIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Categorys</ListItemText>
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
                onClick={() => navigate('/admin/jobs')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <FolderIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>All Jobs</ListItemText>
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
                onClick={() => navigate('/admin/company')}
              >
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',

                }}
                >
                  <CorporateFareIcon />
                  <ListItemText sx={{ opacity: open ? 1 : 0, pl: 3 }}>Companys</ListItemText>
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
          <Divider />

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
          <SeekerList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AdminSeekerList() {
  return <AdminHome />;
}
