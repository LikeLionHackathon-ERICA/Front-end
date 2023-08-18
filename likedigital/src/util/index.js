import axios from "axios";

export const BASE_URL = "http://35.216.16.113:8080";

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
  return response.data[0];
};

export const getAllClass = async () => {
  const response = await axios.get(`${BASE_URL}/classes/`);
  console.log(response);
  return response.data;
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}/`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return true;
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

export const uploadProblem = async ({
  title,
  lat,
  lon,
  username,
  phone_number,
}) => {
  try {
    console.log(title, lat, lon, username, phone_number);
    const response = await axios.post(
      `${BASE_URL}/posts/`,
      {
        title: title,
        user: {
          username: username,
          phone_number: phone_number,
        },
        lat: lat,
        lon: lon,
        status: "매칭 완료",
        category: "기타",
        // matching_user: {
        //   username: "kevin",
        //   phone_number: "+8201033337777",
        // },
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(response.data);
    localStorage.setItem("PostId", response.data.id);
    return response.data;
  } catch (error) {
    console.error("Error uploading problem:", error);
    throw error;
  }
};

export function haversine(lat1, lon1, lat2, lon2) {
  function toRad(value) {
    return (value * Math.PI) / 180;
  }

  const R = 6371e3; // 지구의 반지름 (m)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
