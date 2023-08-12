import React, { useEffect, useState } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
import { useLocation } from "react-router-dom";
import { getMyProfile } from "../util";
function Mypage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Kakao Map Geocoder를 사용하여 위도, 경도를 주소로 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(lon, lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
              if (result[i].region_type === "H") {
                setLocationName(result[i].address_name);
                break;
              }
            }
          }
        });
      });
    }
  }, []);
  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("프로필 정보를 가져오는데 실패했습니다:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Error fetching profile</div>;
  }
  return (
    <section className="flex flex-col">
      <HeaderTitle />
      <div className="w-full flex items-center px-4 gap-4">
        <img className="flex-[0.2]" src="imgs/profile1.png" alt="" />
        <div className="flex justify-between flex-[0.6]">
          <h2 className="text-primary font-bold">{profile.username}</h2>
          <span className="text-gray-500">({locationName})</span>
        </div>
      </div>
    </section>
  );
}

export default Mypage;
