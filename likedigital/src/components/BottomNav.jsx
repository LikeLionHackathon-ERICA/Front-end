import React from "react";
import { BsFillPencilFill, BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoDocumentText } from "react-icons/io5";

export default function BottomNav() {
  return (
    <section className="fixed bottom-0 px-1 py-1 bg-primary text-white w-full grid grid-cols-4 gap-6">
      <div className="flex flex-col justify-center items-center gap-1 rounded py-1 h-full ">
        <AiFillHome className="text-2xl" />
        <span className="text-sm">홈화면</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-1 rounded py-1 h-full ">
        <IoDocumentText className="text-2xl" />
        <span className="text-sm">커뮤니티</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-1 rounded py-1 h-full ">
        <BsFillPencilFill className="text-2xl" />
        <span className="text-sm">문제 작성</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-1 rounded py-1 h-full">
        <BsFillPersonFill className="text-2xl" />
        <span className="text-sm">마이페이지</span>
      </div>
    </section>
  );
}
