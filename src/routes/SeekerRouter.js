import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeLogin from '../pages/seeker/Login';
import SeSignup from '../pages/seeker/Signup';
import SeHome from '../pages/seeker/Home';
import LandingPage from '../pages/seeker/LandingPage';
import JobViews from '../pages/seeker/JobViews';
import SingleJobView from '../pages/seeker/SingleJobView';
import OtpSignUp from '../pages/seeker/OtpSignUp';
import ProfileShow from '../pages/seeker/ProfileShow';
import AddProfile from '../pages/seeker/AddProfile';
import EditProfile from '../pages/seeker/EditProfile';
import FPNumber from '../pages/seeker/Forgot-Password/FPNumber';
import OtpPage from '../pages/seeker/Forgot-Password/OtpPage';
import NewPassword from '../pages/seeker/Forgot-Password/NewPassword';
import AppliedJobs from '../pages/seeker/AppliedJobs';
import Messages from '../pages/seeker/Messages';
import Notification from '../pages/seeker/Notification';

function SeekerRouter() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SeLogin />} />

        <Route path="/signup" element={<SeSignup />} />

        <Route path="/otp" element={<OtpSignUp />} />

        <Route path="/home" element={<SeHome />} />

        <Route path="/jobs" element={<JobViews />} />

        <Route path="/job_view" element={<SingleJobView />} />

        <Route path="/profile" element={<ProfileShow />} />

        <Route path="/add_profile" element={<AddProfile />} />

        <Route path="/edit_profile" element={<EditProfile />} />

        <Route path="/enter_number" element={<FPNumber />} />

        <Route path="/fp_otp" element={<OtpPage />} />

        <Route path="/new_password" element={<NewPassword />} />

        <Route path="/applied_jobs" element={<AppliedJobs />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/notification" element={<Notification />} />

      </Routes>

    </div>
  );
}

export default SeekerRouter;
