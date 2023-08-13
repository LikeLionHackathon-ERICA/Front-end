// hooks/useFetchClasses.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/classes.json");
        setClasses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { classes, loading };
};
