import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReLogin from '../pages/recruiter/Login';
import ReSingup from '../pages/recruiter/Signup';
import ReHome from '../pages/recruiter/Home';
import ProfileShow from '../pages/recruiter/ProfileShow';
import AddJobForm from '../pages/recruiter/AddJobForm';
import MyJobs from '../pages/recruiter/MyJobs';
import JobEdit from '../pages/recruiter/JobEdit';
import OtpSignUp from '../pages/recruiter/OtpSignUp';
import EditProfile from '../pages/recruiter/EditProfile';
import FPNumber from '../pages/recruiter/Forgot-Password/FPNumber';
import OtpPage from '../pages/recruiter/Forgot-Password/OtpPage';
import NewPassword from '../pages/recruiter/Forgot-Password/NewPassword';
import AppliedList from '../pages/recruiter/AppliedList';
import SortedList from '../pages/recruiter/SortedList';
import Messages from '../pages/recruiter/Messages';
import Notification from '../pages/recruiter/Notification';

function RecruiterRouter() {
  return (
    <div>

      <Routes>

        <Route path="/login" element={<ReLogin />} />

        <Route path="/signup" element={<ReSingup />} />

        <Route path="/otp" element={<OtpSignUp />} />

        <Route path="/home" element={<ReHome />} />

        <Route path="/profile" element={<ProfileShow />} />

        <Route path="/add_job" element={<AddJobForm />} />

        <Route path="/edit_jobs" element={<JobEdit />} />

        <Route path="/jobs" element={<MyJobs />} />

        <Route path="/edit_profile" element={<EditProfile />} />

        <Route path="/enter_number" element={<FPNumber />} />

        <Route path="/fp_otp" element={<OtpPage />} />

        <Route path="/new_password" element={<NewPassword />} />

        <Route path="/applied_users" element={<AppliedList />} />

        <Route path="/sorted_users" element={<SortedList />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/notification" element={<Notification />} />

      </Routes>

    </div>
  );
}

export default RecruiterRouter;
