import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../util";

function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/posts/`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the posts", error);
      });
  }, []);

  return posts;
}

export default usePosts;
