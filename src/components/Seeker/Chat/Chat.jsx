/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  styled, createTheme, ThemeProvider, useTheme, alpha,
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
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { io } from 'socket.io-client';
import {
  useContext, useState, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import AppContext from '../../../context/AppContext';
import './Chat.css';
import ChatBox from './ChatBox';
import Conversation from './Conversation';
import { userChats } from '../../../apis/ChatApi';

export default function SeekerChat() {
  const dispatch = useDispatch();
  // const socket = useRef();
  const { user } = useSelector((state) => state.userInfo);
  const { socket } = useContext(AppContext);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user.id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user.id]);

  // Connect to Socket.io
  useEffect(() => {
    // socket.current = io('ws://localhost:8800');
    socket.emit('new-user-add', user.id);
    socket.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.on('recieve-message', (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user.id);
    const online = onlineUsers.find((el) => el.userId === chatMember);
    return !!online;
  };

  return (
    <Box>

      <Grid container>
        {/* Left Side */}
        <Grid item xs={5} sm={4} md={4} lg={4}>
          <div className="Left-side-chat">
            <Paper
              sx={{
                p: 2,
              }}
            >
              {/* Hello */}
              <div className="Chat-container">
                <h2>Chats</h2>
                <div className="Chat-list">
                  {chats.map((chat) => (
                    <div
                      onClick={() => {
                        setCurrentChat(chat);
                      }}
                    >
                      <Conversation
                        data={chat}
                        currentUser={user.id}
                        online={checkOnlineStatus(chat)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Paper>
          </div>
        </Grid>
        {/* Right Side */}
        <Grid item xs={7} sm={8} md={8} lg={8}>
          <div className="Right-side-chat">
            <Paper
              sx={{
                p: 2,
              }}
            >
              {/* <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
            Hello
          </div> */}
              <ChatBox
                chat={currentChat}
                currentUser={user.id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
