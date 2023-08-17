import axios from "axios";
import { useEffect, useState } from "react";

function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/data/posts.json")
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
