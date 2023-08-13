import { createContext, useContext, useState, useEffect } from "react";
import { getMyProfile } from "../util";

const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (error) {
        console.error("프로필 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchProfile();
  }, []);

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

  const value = {
    profile,
    locationName,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
