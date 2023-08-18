import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePosts from "../hook/usePosts";
import HeaderTitle from "../components/UI/HeaderTitle";
import { BiSolidPhoneCall } from "react-icons/bi";
import { deletePost, getAllProblem, haversine } from "../util";
const { kakao } = window;

function PostsPage() {
  const { id } = useParams();
  const posts = usePosts();
  const [post, setPost] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const user_type = localStorage.getItem("userType");
  const navigate = useNavigate();
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
        <h1 className="text-2xl">
          {user_type === "provider" && !post.matching_user
            ? "매칭 완료"
            : "매칭 중"}
        </h1>
        <h1 className="text-2xl text-center px-4 py-2 text-primary font-bold w-full">
          {post.title}
        </h1>
        <div className="flex items-center justify-between px-4 gap-4">
          {user_type === "provider" ? (
            <MatchInfoCard post={post} />
          ) : (
            <MatchReceiverInfoCard post={post} />
          )}
        </div>
        <div className="my-2">
          {user_type !== "receiver" || post.matching_user ? (
            <span>
              거리: {distance ? `${distance.toFixed(2)}m` : "계산중..."}
            </span>
          ) : null}
        </div>

        {user_type === "receiver" && !post.matching_user ? (
          <div className="h-full flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
            <h3 className="text-xl font-semibold">매칭 중입니다</h3>
          </div>
        ) : null}

        <div
          id="mini-map"
          className={`w-full h-[400px] border-4 rounded-xl border-primary ${
            user_type === "receiver" && !post.matching_user ? "opacity-0" : ""
          }`}
        />
      </div>
    </section>
  );
}

export default PostsPage;

function MatchInfoCard({ post }) {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <h2 className="text-xl">{post.user.username}</h2>
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

function MatchReceiverInfoCard({ post }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const matching_user =
    post.matching_user?.username === undefined
      ? "매칭된 사용자가 없습니다"
      : post.matching_user?.username;
  const matching_phone_number =
    post.matching_user?.phone_number === undefined
      ? "매칭된 사용자가 없습니다"
      : post.matching_user?.phone_number;
  return (
    <div className="flex flex-col items-center gap-2 ">
      <h2 className="text-xl">{matching_user}</h2>
      {post.matching_user?.phone_number && (
        <a
          href={`tel:${post.matching_user?.phone_number}`}
          className="flex items-center gap-2 justify-center px-4 py-2 text-white bg-primary rounded-md"
        >
          <BiSolidPhoneCall />
          전화문의
        </a>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("PostId");
          deletePost(id);
          navigate("/posts/null");
        }}
        className="bg-red-400 text-white rounded-md px-2 py-1 text-xl mt-2"
      >
        매칭 취소하기
      </button>
    </div>
  );
}
function NoMatching() {
  const user_type = localStorage.getItem("userType");
  return (
    <section className="flex flex-col">
      <HeaderTitle />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-[1px] justify-center items-center bg-white p-4 rounded-xl shadow-xl w-full max-w-sm mx-4 text-center border-2 border-primary relative">
          <h2 className="text-2xl font-semibold text-primary mb-4">알림</h2>
          <p className="text-2xl mb-6 font-bold text-orange-500">
            현재 성사된 매칭이 없습니다
          </p>
          <p className="flex flex-col mb-6 text-gray-500 gap-1">
            <span className="text-primary text-xl">
              {user_type === "provider" ? "도움지도" : ""}{" "}
            </span>
            <span className="text-primary text-xl">
              {user_type === "provider" ? "문제목록" : "문제작성"}
            </span>
            <span className="text-lg">
              메뉴를 클릭하여
              {user_type === "provider"
                ? " 매칭을 신청해보세요!"
                : " 도움을 요청해보세요!"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
