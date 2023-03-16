/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import InputEmoji from 'react-input-emoji';
import { Button } from '@mui/material';
// import { format } from 'timeago.js';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { addMessage, getMessages } from '../../../apis/ChatApi';
import { getUser } from '../../../apis/SeekerApi';
import './ChatBox.css';

function ChatBox({
  chat, currentUser, setSendMessage, receivedMessage,
}) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (value) => {
    setNewMessage(value);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        await getUser(userId).then((res) => {
          setUserData(res);
        });
      } catch (error) {
        navigate('/error-page');
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        navigate('/error-page');
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message
  const handleSend = async () => {
    // e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch {
      navigate('/error-page');
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    // console.log('Message Arrived: ', receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                      userData
                        ? userData.image
                        : '/avatar.png'
                    }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="name" style={{ fontSize: '0.9rem' }}>
                  <span>
                    {userData?.userName}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: '95%',
                border: '0.1px solid #ececec',
              }}
            />
          </div>
          {/* chat-body */}
          <div className="chat-body">
            {messages.map((message) => (
              <div
                ref={scroll}
                className={
                      message.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
              >
                <span>{message.text}</span>
                {' '}
                {/* <span>{format(message?.createdAt)}</span> */}
                <Moment fromNow>{message?.createdAt}</Moment>
              </div>
            ))}
          </div>
          {/* chat-sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <Button className="send-button button" onClick={handleSend} variant="contained">Send</Button>
            <input
              type="file"
              name=""
              id=""
              style={{ display: 'none' }}
              ref={imageRef}
            />
          </div>
          {' '}
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
}

export default ChatBox;
