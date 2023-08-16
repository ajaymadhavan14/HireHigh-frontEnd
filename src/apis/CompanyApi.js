/* eslint-disable import/prefer-default-export */
import axios from '../axios/axios';

export const comapnySignupApi = async (companyData) => {
  try {
    const { data } = await axios.post('/api/company/signup', companyData);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (token) => {
  try {
    const { data } = await axios.get('/api/company/get_profile', {
      headers: { 'company-access-token': token },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const CompanyJobs = async (token) => {
  try {
    const { data } = await axios.get('/api/company/list_jobs', {
      headers: { 'company-access-token': token },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const jobPostApproval = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `/api/company/job_approval?jobId=${id}`,
      {},
      { headers: { 'company-access-token': token } },
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const jobPostBlock = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `/api/company/job_block?jobId=${id}`,
      {},
      { headers: { 'company-access-token': token } },
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getNotification = async (token) => {
  try {
    const { data } = await axios.get('/api/company/get-notifications', {
      headers: { 'company-access-token': token },
    });
    return data;
  } catch (error) {
    return error;
  }
};
