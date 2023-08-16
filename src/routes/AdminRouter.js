import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdLogin from '../pages/admin/Login';
import AdDashboard from '../pages/admin/Dashboard';
import AdSeeker from '../pages/admin/SeekerList';
import AdRecruiter from '../pages/admin/RecruiterList';
import AllJobPost from '../pages/admin/AllJobPost';
import Category from '../pages/admin/Category';
import Companys from '../pages/admin/Companys';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AdLogin />} />

      <Route path="/home" element={<AdDashboard />} />

      <Route path="/seeker" element={<AdSeeker />} />

      <Route path="/recruiter" element={<AdRecruiter />} />

      <Route path="/jobs" element={<AllJobPost />} />

      <Route path="/category" element={<Category />} />

      <Route path="/company" element={<Companys />} />
    </Routes>
  );
}

export default AdminRouter;
