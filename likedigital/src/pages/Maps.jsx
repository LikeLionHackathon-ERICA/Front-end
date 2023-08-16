import axios from "axios";
import { useEffect, useState, useRef } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
const { kakao } = window;

function Maps() {
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // 추가
  const mapRef = useRef(null);
  const defaultMarkerImageSrc = "/imgs/marker/Vector_1.png";
  const selectedMarkerImageSrc = "/imgs/marker/Vector.png";
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
            disableDoubleClickZoom: true,
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
      const imageSize = new kakao.maps.Size(24, 24);
      const markerImage = new kakao.maps.MarkerImage(
        defaultMarkerImageSrc,
        imageSize
      );
      const selectedMarkerImage = new kakao.maps.MarkerImage(
        selectedMarkerImageSrc,
        imageSize
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

          // 이전 선택된 마커 이미지를 기본 이미지로 변경
          if (selectedMarker) {
            selectedMarker.setImage(markerImage);
          }

          // 현재 선택된 마커 이미지 변경
          postMarker.setImage(selectedMarkerImage);

          // 현재 선택된 마커를 상태로 저장
          setSelectedMarker(postMarker);
        });
      });
    }
  }, [posts, mapRef.current, selectedMarker]);

  return (
    <section>
      <HeaderTitle />
      <div id="map" className="w-full h-[65vh]" />
      {selectedPost && <PostCard post={selectedPost} />}
      {/* <h1 className="text-center text-xl">{address}</h1> */}
    </section>
  );
}

export default Maps;

function PostCard({ post }) {
  console.log(post);
  return (
    <div className=" relative flex gap-2 flex-col px-2 py-4 border-2 border-black rounded-lg mt-1 mx-[0.5px]">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-primary">{post.title}</h1>
        <p className="px-2 py-1 rounded-lg border-2 w-fit">{post.category}</p>
      </div>
      <div className="flex items-center justify-between px-4">
        <span>{post.user.username}님</span>
        <button className="p-2 bg-primary text-white w-fit py-1 rounded-lg">
          신청하기
        </button>
      </div>
    </div>
  );
}

// <a
//   className="p-2 bg-primary text-white w-fit py-1 rounded-lg"
//   href={`tel:${post.user.phone_number}`}
// >
//   전화하기
// </a>;
