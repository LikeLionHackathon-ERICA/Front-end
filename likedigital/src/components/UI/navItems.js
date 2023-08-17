import { AiFillHome } from "react-icons/ai";
import { MdOutlineClass } from "react-icons/md";
import {
  BsFillPencilFill,
  BsFillPersonFill,
  BsCardChecklist,
} from "react-icons/bs";
import { useEffect, useState } from "react";

const username = localStorage.getItem("username");

export const receiverNavItems = [
  { name: "홈화면", path: "/posts", icon: AiFillHome },
  { name: "수업 목록", path: "/class", icon: MdOutlineClass },
  { name: "문제 작성", path: "/register", icon: BsFillPencilFill },
  {
    name: "마이페이지",
    path: `/mypage?username=${username}`,
    icon: BsFillPersonFill,
  },
];
const [postId, setPostId] = useState(localStorage.getItem("PostId")); // 상태 추가

useEffect(() => {
  setPostId(localStorage.getItem("PostId")); // 로컬 스토리지 값이 변경되면 상태 업데이트
}, [location]); // location 변경 시에만 useEffect 실행

export const providerNavItems = [
  {
    name: "매칭화면",
    path: `/posts/${localStorage.getItem("PostId")}`,
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
