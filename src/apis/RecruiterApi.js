import axios from '../axios/axios';

export const recruiterSignupApi = async (recruiterData) => {
  try {
    const { data } = await axios.post('/api/recruiter/signup', recruiterData);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-profile', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterSideJobList = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/jobs', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategory = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-cat', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobDele = async (id, token) => {
  try {
    const data = await axios.patch(`/api/recruiter/job-dele?id=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterJobEdit = async (id, token) => {
  try {
    const { data } = await axios.get(`/api/recruiter/job-edit?id=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfileData = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-profile-data', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterSideJobAppliedList = async (id, token) => {
  try {
    const { data } = await axios.get(`/api/recruiter/applied-users?jobId=${id}`, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const RecruiterComment = async (token, reData) => {
  try {
    const { data } = await axios.post('/api/recruiter/job-comment', reData, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getUserSortedList = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-sorted-user', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const allData = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/allDatas', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`/api/recruiter/user/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getCompany = async () => {
  try {
    const { data } = await axios.get('/api/recruiter/get-company');
    return data;
  } catch (error) {
    return error;
  }
};

export const getCompanyData = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-companyData', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const AddNotification = async (formData, token) => {
  try {
    const data = await axios.post('/api/recruiter/add-notification', formData, { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};

export const getNotification = async (token) => {
  try {
    const { data } = await axios.get('/api/recruiter/get-notifications', { headers: { 'recruiter-access-token': token } });
    return data;
  } catch (error) {
    return error;
  }
};
