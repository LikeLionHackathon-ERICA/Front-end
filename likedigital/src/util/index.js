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

export const getAllProblem = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading problem:", error);
    throw error;
  }
};

export const uploadProblem = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/posts/`,
      {
        title: "편의점 택배보내기",
        user: {
          username: "TESTIDTESTID",
          phone_number: "+821033339999",
        },
        lat: 34,
        lon: 56,
        status: "매칭 완료",
        category: "기타",
        matching_user: {
          username: "해결사1",
          phone_number: "+821010101999",
        },
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading problem:", error);
    throw error;
  }
};
