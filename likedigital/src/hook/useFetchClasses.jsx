// hooks/useFetchClasses.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, getAllClass } from "../util";

export const useFetchClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const response = await getAllClass();
      setClasses(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching classes data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);

  return { classes, loading };
};
