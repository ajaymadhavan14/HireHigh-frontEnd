/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../apis/SeekerApi';

function Conversation({ data, currentUser, online }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        await getUser(userId).then((res) => {
          setUserData(res);
        });
        dispatch({ type: 'SAVE_USER', data });
      } catch (error) {
        navigate('/error-page');
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot" />}
          <img
            src={userData
              ? userData.image
              : '/avatar.png'}
            alt="Profile"
            className="followerImage"
            style={{ width: '50px', height: '50px' }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.userName}
            </span>
            <span style={{ color: online ? '#51e200' : '' }}>{online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  );
}

export default Conversation;
