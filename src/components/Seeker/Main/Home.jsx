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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Swal2 from 'sweetalert2';
import { allData } from '../../../apis/SeekerApi';
import { createChat } from '../../../apis/ChatApi';
import SeekerSideModal from './Modal';

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

export default function SeekerHomeCard() {
  const [modalDatas, setModalDatas] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    async function invoke() {
      if (token) {
        await allData(token).then((res) => {
          setData(res);
        });
      } else {
        swal('Please Login');
        navigate('/login');
      }
    }
    invoke();
  }, []);

  const { user } = useSelector((state) => state.userInfo);

  const sendMessage = async (id) => {
    const datas = { senderId: user.id, receiverId: id };
    await createChat(datas).then((res) => {
      if (res.status === 'success') {
        navigate('/messages');
      }
    });
  };
  const openModal = async (el) => {
    setModal(true);
    setModalDatas(el);
  };
  return (

    <Box sx={{ flexGrow: 1, marginLeft: '5rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'start', padding: '3vh' }}>
        <Typography
          component="h1"
          variant="h5"
        >
          Company Recruiters
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((el) => (
          <Card
            sx={{
              m: 3, minWidth: 300, minHeight: 340, maxWidth: 310,
            }}
          >
            <CardMedia
              sx={{ height: 170, width: 300 }}
              image={el?.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el?.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el?.tagLine}
              </Typography>
            </CardContent>
            <CardActions sx={{ marginBottom: '1rem' }}>
              <Button onClick={() => {
                setModalDatas(el);
                setModal(true);
              }}
              >
                view
              </Button>
              <Button variant="contained" onClick={() => sendMessage(el?._id)}>Message</Button>
            </CardActions>
          </Card>

        ))}
        {modal && <SeekerSideModal state={modalDatas} setModal={setModal} />}

      </Grid>
    </Box>
  );
}
