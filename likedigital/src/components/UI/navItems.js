import { AiFillHome } from "react-icons/ai";
import { MdOutlineClass } from "react-icons/md";
import {
  BsFillPencilFill,
  BsFillPersonFill,
  BsCardChecklist,
} from "react-icons/bs";

const username = localStorage.getItem("username");

export const receiverNavItems = [
  { name: "홈화면", path: "/home", icon: AiFillHome },
  { name: "수업 목록", path: "/class", icon: MdOutlineClass },
  { name: "문제 작성", path: "/register", icon: BsFillPencilFill },
  {
    name: "마이페이지",
    path: `/mypage?username=${username}`,
    icon: BsFillPersonFill,
  },
];

export const providerNavItems = [
  { name: "홈화면", path: "/home", icon: AiFillHome },
  { name: "도움 지도", path: "/maps", icon: MdOutlineClass },
  { name: "문제 목록", path: "/problem", icon: BsCardChecklist },
  {
    name: "마이페이지",
    path: `/mypage?username=${username}`,
    icon: BsFillPersonFill,
  },
];
