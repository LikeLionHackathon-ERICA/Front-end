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
      filtered.sort((a, b) => a.calculatedDistance - b.calculatedDistance);
      setFilteredPosts(filtered);
    }
  }, [currentPosition, posts]);

  return (
    <section className="flex flex-col relative">
      <HeaderTitle />
      <div className="flex flex-col justify-center gap-2 px-2 mt-4">
        <h1 className="mb-1 text-center text-lg text-white bg-sky rounded-full py-1 tracking-wider w-[95%] mx-auto">
          반경 500m 도움 요청 목록{" "}
        </h1>
        {filteredPosts.map((problem, index) => (
          <ProblemCard
            key={index}
            id={problem.id}
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
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  const distance = 12742 * Math.asin(Math.sqrt(a));
  return Math.round(distance * 1000);
}
