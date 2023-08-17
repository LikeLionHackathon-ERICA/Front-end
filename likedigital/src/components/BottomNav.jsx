import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineClass } from "react-icons/md";
import {
  BsFillPencilFill,
  BsFillPersonFill,
  BsCardChecklist,
} from "react-icons/bs";
const username = localStorage.getItem("username");
const userType = localStorage.getItem("userType");

export default function BottomNav() {
  const location = useLocation();
  const [postId, setPostId] = useState(localStorage.getItem("PostId")); // 상태 추가
  useEffect(() => {
    setPostId(localStorage.getItem("PostId")); // 로컬 스토리지 값이 변경되면 상태 업데이트
  }, [location]); // location 변경 시에만 useEffect 실행

  const receiverNavItems = [
    { name: "홈화면", path: "/posts", icon: AiFillHome },
    { name: "수업 목록", path: "/class", icon: MdOutlineClass },
    { name: "문제 작성", path: "/register", icon: BsFillPencilFill },
    {
      name: "마이페이지",
      path: `/mypage?username=${username}`,
      icon: BsFillPersonFill,
    },
  ];

  const providerNavItems = [
    {
      name: "매칭화면",
      path: `/posts/${postId}`,
      icon: AiFillHome,
    },
    { name: "도움 지도", path: "/maps", icon: MdOutlineClass },
    { name: "문제 목록", path: "/problem", icon: BsCardChecklist },
    {
      name: "마이페이지",
      path: `/mypage?username=${username}`,
      icon: BsFillPersonFill,
    },
  ];
  const restrictedPaths = ["/maps", "/problem"];

  const NAV_ITEMS =
    userType === "receiver" ? receiverNavItems : providerNavItems;

  return (
    <section className="fixed bottom-0 px-1 py-1 pt-2 bg-white text-primary w-full grid grid-cols-4 gap-6 rounded-t-2xl border-t-4 border-emerald-300">
      {NAV_ITEMS.map(({ name, path, icon: Icon }) => {
        const isActive = location.pathname.startsWith(path.split("?")[0]);

        const finalPath =
          postId && restrictedPaths.includes(path) ? `/posts/${postId}` : path;

        return (
          <Link
            to={finalPath}
            key={name}
            className="flex flex-col justify-center items-center gap-1 rounded py-1 h-full"
          >
            <Icon
              className={`text-2xl ${
                isActive ? "text-yellow-400" : "text-primary"
              }`}
            />
            <span
              className={`text-sm ${
                isActive ? "text-yellow-400" : "text-primary"
              }`}
            >
              {name}
            </span>
          </Link>
        );
      })}
    </section>
  );
}
