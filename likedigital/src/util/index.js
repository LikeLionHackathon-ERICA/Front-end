import axios from "axios";

const BASE_URL = "http://35.216.16.113:8080";

export const registerAuth = async (user) => {
  const response = await axios.post(`${BASE_URL}/auth/registration/`, user);
  console.log(response);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${BASE_URL}/auth/profile/`);
  console.log(response);
  return response.data;
};

export const LoginAuth = async (user) => {
  const response = await axios.post(`${BASE_URL}/auth/login/`, user);
  console.log(response);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axios.get(`${BASE_URL}/auth/profile/`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(response.data[0]);
  return response.data[0];
};

export const getAllClass = async () => {
  const response = await axios.get(`${BASE_URL}/class/`);
  console.log(response);
  return response.data;
};

export const registerClass = async (classId) => {
  const response = await axios.post(`${BASE_URL}/class/${classId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(response);
  return response.data;
};
