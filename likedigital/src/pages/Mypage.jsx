import React, { useEffect, useState } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
import { useLocation } from "react-router-dom";
import { getMyProfile } from "../util";
import { GrLocation } from "react-icons/gr";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import InfoCard from "../components/mypage/InfoCard";
function Mypage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [isSolved, setIsSolved] = useState(true);
  const titles = [
    "편의점 택배 하는방법",
    "신한은행 인터넷뱅킹 ",
    "요금제 바꾸는 방법",
  ];
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
    <section>
      <HeaderTitle />
      <div className="w-full flex items-center px-8 gap-4 mt-8">
        <img className="w-24 h-24" src="imgs/profile1.png" alt="profile" />
        <div className="flex flex-col justify-between items-center gap-2">
          <h2 className="text-textGray pb-[0.5px] border-b-[3px] border-primary w-fit text-lg">
            <span className=" text-gray-400">이름 : </span>
            {profile.username}
          </h2>
          <div className="w-full text-gray-500 flex items-center py-1 px-3 gap-1 shadow-md border-t-2 rounded-full text-sm whitespace-nowrap justify-center">
            <GrLocation />
            <span>{locationName}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 px-8 shadow-md">
        <div className="flex items-center gap-4 px-2">
          <InfoCard title="유저 타입" content={profile.user_type} />
          <InfoCard title="누적 도움" content={profile.score} />
          {/* 관심사로 변경 */}
          <InfoCard title="누적 도움" content={profile.score} />
        </div>
      </div>

      {/* 글목록 세션 */}
      <div className="flex flex-col items-center justify-center gap-2 mt-6 px-8">
        <div className="flex items-center justify-between w-full mb-2">
          <h2 className="text-textGray text-lg font-bold">내가 쓴 글</h2>
          <button className="text-primary text-sm font-bold">더보기</button>
        </div>
        {titles.map((title, index) => (
          <PostCard key={index} isSolved={isSolved} title={title} />
        ))}
      </div>
      {/* 내가 신청한 수업 */}
      <div className="flex flex-col items-center justify-center gap-2 mt-6 px-8">
        <div className="flex items-center justify-between w-full mb-2">
          <h2 className="text-textGray text-lg font-bold">내가 쓴 글</h2>
          <button className="text-primary text-sm font-bold">더보기</button>
        </div>
        {titles.map((title, index) => (
          <PostCard key={index} isSolved={isSolved} title={title} />
        ))}
      </div>
    </section>
  );
}

export default Mypage;

function PostCard({ isSolved, title }) {
  return (
    <div
      className={`w-full
          ${
            isSolved
              ? "bg-question border-yellow-300"
              : "bg-gray-400 border-gray-500"
          }
           flex gap-4 p-2 px-3 rounded-lg border-2`}
    >
      <img src="imgs/question.png" alt="" className=" object-contain" />
      <span className="text-lg">{title}</span>
    </div>
  );
}
