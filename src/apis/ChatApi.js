import axios from '../axios/axios';

export const createChat = async (datas) => {
  try {
    const { data } = await axios.post('/api/chat/', datas);
    return data;
  } catch (error) {
    return error;
  }
};

export const userChats = async (id) => {
  try {
    const data = axios.get(`/api/chat/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const findChat = async (firstId, secondId) => {
  try {
    const data = axios.get(`/api/chat/find/${firstId}/${secondId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getMessages = async (id) => {
  try {
    const data = axios.get(`/api/message/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const addMessage = async (data) => {
  try {
    const datas = await axios.post('/api/message/', data);
    return datas;
  } catch (error) {
    return error;
  }
};
