import React from "react";
import { BsFillPencilFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";
import { useNavigate, useLocation, Link } from "react-router-dom";
const username = localStorage.getItem("username");
const NAV_ITEMS = [
  { name: "홈화면", path: "/home", icon: AiFillHome },
  { name: "커뮤니티", path: "/problem", icon: IoDocumentText },
  { name: "문제 작성", path: "/register", icon: BsFillPencilFill },
  {
    name: "마이페이지",
    path: `/mypage?username=${username}`,
    icon: BsFillPersonFill,
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section className="fixed bottom-0 px-1 py-1 pt-2 bg-white text-primary w-full grid grid-cols-4 gap-6 rounded-t-2xl border-t-4 border-emerald-300">
      {NAV_ITEMS.map(({ name, path, icon: Icon }) => {
        const isActive = location.pathname.startsWith(path.split("?")[0]);
        return (
          <Link
            to={path}
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
