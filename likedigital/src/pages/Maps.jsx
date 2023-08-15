import axios from "axios";
import { useEffect, useState, useRef } from "react";
const { kakao } = window;

function Maps() {
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 post를 추적하는 상태
  const mapRef = useRef(null);

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
            zoomable: false,
            scrollwheel: false,
          };

          const map = new kakao.maps.Map(container, options);
          mapRef.current = map;

          const circleOptions = {
            center: new kakao.maps.LatLng(lat, lng),
            radius: 10,
            fillColor: "red",
            fillOpacity: 1,
            strokeWeight: 0,
          };
          const circle = new kakao.maps.Circle(circleOptions);
          circle.setMap(map);

          kakao.maps.event.addListener(map, "dragend", function () {
            const position = map.getCenter();

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2Address(
              position.getLng(),
              position.getLat(),
              function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                  const addressData = result[0];
                  setAddress(
                    addressData.road_address
                      ? addressData.road_address.address_name
                      : addressData.address.address_name
                  );
                  setBuildingName(addressData.address.building_name || "");
                }
              }
            );
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
      posts.forEach((post) => {
        const postPosition = new kakao.maps.LatLng(post.lat, post.lon);
        const postMarker = new kakao.maps.Marker({
          position: postPosition,
        });
        postMarker.setMap(mapRef.current);

        kakao.maps.event.addListener(postMarker, "click", function () {
          setSelectedPost(post); // 마커 클릭 시 해당 post를 선택
        });
      });
    }
  }, [posts, mapRef.current]);

  return (
    <section>
      <div id="map" className="w-full h-[500px]" />
      <h1 className="text-center text-xl">{address}</h1>
      <h2 className="text-center text-lg">{buildingName}</h2>
      {selectedPost && (
        <div>
          <h3>{selectedPost.title}</h3>
          <p>Username: {selectedPost.user.username}</p>
          <p>Phone: {selectedPost.user.phone_number}</p>
          <p>Status: {selectedPost.status}</p>
          <p>Category: {selectedPost.category}</p>
        </div>
      )}
    </section>
  );
}

export default Maps;
