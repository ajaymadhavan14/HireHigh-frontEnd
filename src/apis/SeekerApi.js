import axios from '../axios/axios';

export const seekerSignupApi = async (userData) => {
  try {
    const { data } = await axios.post('/api/signup', userData);
    return data;
  } catch (error) {
    return error;
  }
};

export const jobListSeekerSide = async (token) => {
  try {
    const { data } = await axios.get('/api/jobs', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const jobApply = async (id, user, token) => {
  try {
    const data = await axios.post(`/api/job_apply?id=${id}`, user, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getSingleJobData = async (id, token) => {
  try {
    const { data } = await axios.get(`/api/single_view?id=${id}`, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/api/get_data', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const searchProfileData = async (token) => {
  try {
    const { data } = await axios.get('/api/profile_search', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfileData = async (token) => {
  try {
    const { data } = await axios.get('/api/get_profiledata', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const applyedJobsSeeker = async (token) => {
  try {
    const { data } = await axios.get('/api/applied_jobs', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getSerachJob = async (job, token) => {
  try {
    const { data } = await axios.get(`/api/search_job?value=${job}`, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getFilterJob = async (getData, token) => {
  try {
    const { data } = await axios.post('/api/get_jobfilter', getData, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const allData = async (token) => {
  try {
    const { data } = await axios.get('/api/allDatas', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`/api/user/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getNotification = async (token) => {
  try {
    const { data } = await axios.get('/api/get_notifications', { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AddNotification = async (formData, token) => {
  try {
    const data = await axios.post('/api/add_notification', formData, { headers: { 'user-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
