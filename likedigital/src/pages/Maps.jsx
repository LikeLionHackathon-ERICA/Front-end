import axios from "axios";
import { useEffect, useState, useRef } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
import { useNavigate } from "react-router-dom";
import usePosts from "../hook/usePosts";
const { kakao } = window;

function Maps() {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [nearbyPostsCount, setNearbyPostsCount] = useState(0);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const defaultMarkerImageSrc = "/imgs/marker/Vector_1.png";
  const selectedMarkerImageSrc = "/imgs/marker/Vector.png";
  const posts = usePosts();

  useEffect(() => {
    kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const container = document.getElementById("map");
          const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
            disableDoubleClickZoom: true,
            zoomable: false,
            scrollwheel: false,
          };

          const map = new kakao.maps.Map(container, options);
          mapRef.current = map;

          const circleOptions = {
            center: new kakao.maps.LatLng(lat, lng),
            radius: 10,
            fillColor: "blue",
            fillOpacity: 1,
            strokeWeight: 0,
          };
          const circle = new kakao.maps.Circle(circleOptions);
          circle.setMap(map);

          axios
            .get("/data/posts.json")
            .then((response) => {
              let count = 0;
              const imageSize = new kakao.maps.Size(24, 24);
              const markerImage = new kakao.maps.MarkerImage(
                defaultMarkerImageSrc,
                imageSize
              );

              response.data.forEach((post) => {
                const postPosition = new kakao.maps.LatLng(post.lat, post.lon);
                const postMarker = new kakao.maps.Marker({
                  position: postPosition,
                  image: markerImage,
                });
                postMarker.setMap(map);
                const distance = getDistance(lat, lng, post.lat, post.lon);
                if (distance <= 500) count++;

                kakao.maps.event.addListener(postMarker, "click", function () {
                  setSelectedPost(post);
                  map.setCenter(postPosition);
                });
              });
              setNearbyPostsCount(count);
              console.log(`근처 500m 이내의 게시물 수: ${nearbyPostsCount}`);
            })
            .catch((error) => {
              console.error("Error fetching the posts", error);
            });
        },
        (error) => {
          console.error("Geolocation is not supported or permission denied.");
        }
      );
    });
  }, []);

  useEffect(() => {
    if (mapRef.current && posts.length > 0) {
      const imageSize = new kakao.maps.Size(24, 24);
      const imageOffset = new kakao.maps.Point(12, 12);
      const markerImage = new kakao.maps.MarkerImage(
        defaultMarkerImageSrc,
        imageSize,
        null,
        imageOffset
      );
      const selectedMarkerImage = new kakao.maps.MarkerImage(
        selectedMarkerImageSrc,
        imageSize,
        null,
        imageOffset
      );

      posts.forEach((post) => {
        const postPosition = new kakao.maps.LatLng(post.lat, post.lon);
        const postMarker = new kakao.maps.Marker({
          position: postPosition,
          image: markerImage,
        });
        postMarker.setMap(mapRef.current);

        kakao.maps.event.addListener(postMarker, "click", function () {
          setSelectedPost(post);
          mapRef.current.setCenter(postPosition);

          if (selectedMarker) {
            selectedMarker.setImage(markerImage);
          }

          postMarker.setImage(selectedMarkerImage);
          setSelectedMarker(postMarker);

          if (selectedCircle) {
            selectedCircle.setMap(null);
          }

          const circleCenter = new kakao.maps.LatLng(
            post.lat + 0.0001,
            post.lon
          );

          const circleOptions = {
            center: circleCenter,
            radius: 20,
            fillColor: "#39C088",
            fillOpacity: 0.5,
            strokeColor: "#33AC7A",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          };
          const circle = new kakao.maps.Circle(circleOptions);
          circle.setMap(mapRef.current);
          setSelectedCircle(circle);
        });
      });
    }
  }, [posts, mapRef.current, selectedMarker]);

  function getDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // Kilometers
    dist = dist * 1000; // Meters
    return dist;
  }

  return (
    <section>
      <HeaderTitle />
      <div id="map" className="relative w-full h-[65vh]">
        <span className="absolute top-2 left-4 bg-white p-2 rounded-lg shadow-md z-40">
          근처 도움 요청 건수 : {nearbyPostsCount}
        </span>
      </div>

      {selectedPost && <PostCard post={selectedPost} />}
    </section>
  );
}

export default Maps;

function PostCard({ post }) {
  const navigate = useNavigate();
  const HandleMatchingPost = (id) => {
    localStorage.setItem("PostId", id);
    navigate(`/posts/${id}`);
  };
  return (
    <div className="relative flex gap-2 flex-col px-2 py-4 border-2 border-black rounded-lg mt-1 mx-[0.5px]">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">{post.title}</h1>
        <p className="px-2 py-1 rounded-lg border-2 w-fit">{post.category}</p>
      </div>
      <div className="flex items-center justify-between px-4">
        <span>{post.user.username}님</span>
        <button
          onClick={() => HandleMatchingPost(post.id)}
          to={`/posts/${post.id}`}
          className="p-2 bg-primary text-white w-fit py-1 rounded-lg"
        >
          신청하기
        </button>
      </div>
    </div>
  );
}
