import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyProfile } from "../hook/useMyProfile";
import { uploadProblem } from "../util";
const { kakao } = window;

export default function Map() {
  const [address, setAddress] = useState(""); // 주소 상태
  const [lat, setLat] = useState(""); // 위도 상태
  const [lon, setLon] = useState(""); // 경도 상태
  const {
    state: { title },
  } = useLocation();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const { profile } = useMyProfile();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await uploadProblem({
        title: title,
        lat: lat,
        lon: lon,
        username: profile.username,
        phone_number: profile.phone_number,
      });
      alert("문제가 성공적으로 등록되었습니다.");
      navigate(`/posts/${localStorage.getItem("PostId")}`);
    } catch (error) {
      console.error("Error during problem submission:", error);
      alert("문제 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.299523967520926, 126.83843296039184),
      level: 1,
      draggable: true,
      scrollwheel: false,
    };
    const map = new kakao.maps.Map(container, options);
    // Geocoder 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 내 위치 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);

        // 내 위치 마커 표시 (드래그 가능, 기본 마커 사용)
        const marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
          draggable: true, // 드래그 가능
        });

        setIsLoading(false); // 로딩 상태 변경

        // 마커 드래그 종료 이벤트
        kakao.maps.event.addListener(marker, "dragend", function () {
          const position = marker.getPosition();
          setLat(position.getLat()); // 위도 상태 업데이트
          setLon(position.getLng()); // 경도 상태 업데이트
          // 주소 검색
          geocoder.coord2Address(
            position.getLng(),
            position.getLat(),
            function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const detailAddr = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;
                setAddress(detailAddr); // 주소 상태 업데이트
              }
            }
          );
        });
      });
    }
  }, []);

  return (
    <div className="relative z-0 flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-75 z-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      )}
      <div
        className="relative h-[90px] text-gray-400 text-md px-5 py-3 rounded-br-2xl w-full shadow-md flex flex-col
        items-center gap-[2px] border-[1px] border-l-0 border-gray-400
        z-10"
      >
        <div
          className="w-full flex items-center gap-1 mb-2"
          onClick={() => navigate("/register")}
        >
          <BiChevronLeft className="text-2xl" />
          <span className="text-gray-500">뒤로가기</span>
        </div>

        <div className="relative rounded-full w-fit border-[1.5px] border-gray-400 shadow-lg text-gray-400 py-[4px] px-4 tracking-wide">
          현위치 : <span className="text-black">{address}</span>
          <div className="w-[6px] h-[6px] rounded-full bg-primary absolute left-2 top-1" />
        </div>
      </div>

      <div id="map" className="w-full h-[70vh] relative mb-3">
        {!address && (
          <h3 className="text-lg  bg-gray-600 text-white px-4 py-[2px] rounded-full absolute top-2 z-20 right-5">
            마커를 끌어서 본인의 위치를 지정해주세요
          </h3>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="py-2 px-3 text-xl bg-primary text-white"
      >
        도움 요청 등록하기
      </button>
    </div>
  );
}
