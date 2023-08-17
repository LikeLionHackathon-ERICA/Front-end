import ProblemCard from "../components/problem/ProblemCard";
import HeaderTitle from "../components/UI/HeaderTitle";
import usePosts from "../hook/usePosts";
import { useEffect, useState } from "react";

export default function ProblemView() {
  const posts = usePosts();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (currentPosition) {
      const withDistance = posts.map((post) => {
        const distance = getDistanceBetween(
          currentPosition.lat,
          currentPosition.lon,
          post.lat,
          post.lon
        );
        return { ...post, calculatedDistance: distance };
      });

      const filtered = withDistance.filter(
        (post) => post.calculatedDistance <= 500
      );
      setFilteredPosts(filtered);
    }
  }, [currentPosition, posts]);

  return (
    <section className="flex flex-col relative">
      <HeaderTitle />
      <div className="flex flex-col justify-center gap-2 px-2 mt-4">
        {filteredPosts.map((problem, index) => (
          <ProblemCard
            key={index}
            title={problem.title}
            phoneNumber={problem.phoneNumber}
            distance={problem.calculatedDistance} // distance로 전달
            status={problem.status}
            category={problem.category}
            user={problem.user.username}
          />
        ))}
      </div>
    </section>
  );
}

function getDistanceBetween(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}
