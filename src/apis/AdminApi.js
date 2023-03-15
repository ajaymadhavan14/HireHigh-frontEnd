import axios from '../axios/axios';

// eslint-disable-next-line import/prefer-default-export
export const AdminGetUsers = async (token) => {
  try {
    const { data } = await axios.get('/api/admin/get_users', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminGetRecruiters = async (token) => {
  try {
    const { data } = await axios.get('/api/admin/get_recruiters', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideJobList = async (token) => {
  try {
    const { data } = await axios.get('/api/admin/jobs', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const seekerBlocked = async (userId, token) => {
  try {
    const { data } = await axios.patch(`/api/blocked?userId=${userId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const seekerActivated = async (userId, token) => {
  try {
    const { data } = await axios.patch(`/api/actived?userId=${userId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const recruiterBlocked = async (recruiterId, token) => {
  try {
    const { data } = await axios.patch(`/api/recruiter/blocked?recruiterId=${recruiterId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const recruiterActivated = async (recruiterId, token) => {
  try {
    const { data } = await axios.patch(`/api/recruiter/actived?recruiterId=${recruiterId}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const JobBlocked = async (id, token) => {
  try {
    const { data } = await axios.patch(`/api/admin/job_blocked?jobId=${id}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const JobActivated = async (id, token) => {
  try {
    const { data } = await axios.patch(`/api/admin/job_actived?jobId=${id}`, {}, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminSideCategoryShow = async (token) => {
  try {
    const { data } = await axios.get('/api/admin/job_category', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const CategoryDelete = async (id, token) => {
  try {
    const data = await axios.delete(`/api/admin/cat_dele?Id=${id}`, { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AdminGetCompanys = async (token) => {
  try {
    const { data } = await axios.get('/api/admin/companys', { headers: { 'admin-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
