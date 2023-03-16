/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-sequences */
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import store from './redux/store';
import AppContext from './context/AppContext';
import AdminRouter from './routes/AdminRouter';
import RecruiterRouter from './routes/RecruiterRouter';
import SeekerRouter from './routes/SeekerRouter';
import CompanyRouter from './routes/CompanyRouter';
import ErrorPage from './components/ErrorPage/Page-404';

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [recruiterDetails, setRecruiterDetails] = useState({});
  const [userOtpConf, setUserOtpConf] = useState({});
  const [recruiterOtpConf, setRecruiterOtpConf] = useState([]);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [companyOtpConf, setCompanyOtpConf] = useState([]);
  const [socket, setSocket] = useState(io('https://socket.hirehigh.online'));
  const [sendNotification, setSendNotification] = useState(null);
  const [recieveNotification, setRecieveNotification] = useState(null);

  return (
    <Provider store={store}>
      <AppContext.Provider value={{
        userDetails,
        setUserDetails,
        recruiterDetails,
        setRecruiterDetails,
        userOtpConf,
        setUserOtpConf,
        recruiterOtpConf,
        setRecruiterOtpConf,
        companyDetails,
        setCompanyDetails,
        companyOtpConf,
        setCompanyOtpConf,
        socket,
        sendNotification,
        setSendNotification,
        recieveNotification,
        setRecieveNotification,
      }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/*" element={<SeekerRouter />} />
            <Route path="/admin/*" element={<AdminRouter />} />
            <Route path="/recruiter/*" element={<RecruiterRouter />} />
            <Route path="/company/*" element={<CompanyRouter />} />
            <Route path="/error-page" element={<ErrorPage />} />

          </Routes>
        </BrowserRouter>

      </AppContext.Provider>
    </Provider>
  );
}

export default App;
