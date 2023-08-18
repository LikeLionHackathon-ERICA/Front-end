import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../util";
export const useMyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/profile/`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProfile(response.data[0]);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
