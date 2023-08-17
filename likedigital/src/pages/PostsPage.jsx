import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePosts from "../hook/usePosts";
import HeaderTitle from "../components/UI/HeaderTitle";
import { BiSolidPhoneCall } from "react-icons/bi";
import { haversine } from "../util";
const { kakao } = window;

function PostsPage() {
  const { id } = useParams();
  const posts = usePosts();
  const [post, setPost] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distance, setDistance] = useState(null); // 추가

  useEffect(() => {
    setPost(posts.find((p) => p.id === parseInt(id)));
  }, [posts, id]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (post && currentPosition) {
      const midLat = (currentPosition.lat + post.lat) / 2;
      const midLon = (currentPosition.lon + post.lon) / 2;

      const container = document.getElementById("mini-map");
      const options = {
        center: new kakao.maps.LatLng(midLat, midLon), // 중간 지점으로 센터 설정
        level: 4,
        scrollwheel: false,
        zoomable: false,
        disableDoubleClickZoom: false,
      };
      const map = new kakao.maps.Map(container, options);

      const startPoint = new kakao.maps.LatLng(
        currentPosition.lat,
        currentPosition.lon
      );
      const endPoint = new kakao.maps.LatLng(post.lat, post.lon);

      const polyline = new kakao.maps.Polyline({
        path: [startPoint, endPoint],
        strokeWeight: 5,
        strokeColor: "#db4040",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });

      polyline.setMap(map);

      // 사용자의 위치 마커 추가
      new kakao.maps.Marker({
        map: map,
        position: startPoint,
        title: "내 위치",
      });

      // 상대방의 위치 마커 추가
      new kakao.maps.Marker({
        map: map,
        position: endPoint,
        title: "상대방 위치",
      });

      // 거리 계산
      const distanceInMeters = haversine(
        currentPosition.lat,
        currentPosition.lon,
        post.lat,
        post.lon
      );
      setDistance(distanceInMeters);
    }
  }, [post, currentPosition]);
  if (id === 0) return <NoMatching />;
  if (!post) return <NoMatching />;
  return (
    <section>
      <HeaderTitle />
      <div className="flex flex-col justify-center items-center gap-2 py-4 px-1">
        <h1 className="text-2xl">매칭 완료</h1>
        <h1 className="text-2xl text-center px-4 py-2 text-primary font-bold w-full">
          {post.title}
        </h1>
        <div className="flex items-center justify-between px-4 gap-4">
          <MatchInfoCard post={post} />
        </div>
        {/* 거리 표시 */}
        <div className="my-2">
          <span>
            거리: {distance ? `${distance.toFixed(2)}m` : "계산중..."}
          </span>
        </div>
        {/* 지도 컨테이너 추가 */}
        <div
          id="mini-map"
          className="w-full h-[400px] border-4 rounded-xl border-primary"
        />
      </div>
    </section>
  );
}

export default PostsPage;

function MatchInfoCard({ post }) {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <h2>{post.user.username}님</h2>
      <a
        href={`tel:${post.user.phone_number}`}
        className="flex items-center gap-2 justify-center px-4 py-2 text-white bg-primary rounded-md"
      >
        <BiSolidPhoneCall />
        전화문의
      </a>
    </div>
  );
}
function NoMatching() {
  return (
    <section className="flex flex-col">
      <HeaderTitle />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-[1px] justify-center items-center bg-white p-4 rounded-xl shadow-xl w-full max-w-sm mx-4 text-center border-2 border-primary relative">
          <h2 className="text-2xl font-semibold text-primary mb-4">알림</h2>
          <p className="text-xl mb-6 text-gray-600 font-bold">
            현재 성사된 매칭이 없습니다
          </p>
          <p className="flex flex-col mb-6 text-gray-500 gap-1">
            <span className="text-primary text-xl">도움지도</span>
            <span className="text-primary text-xl">문제목록</span>
            메뉴를 클릭하여 매칭을 신청해보세요!
          </p>
        </div>
      </div>
    </section>
  );
}
