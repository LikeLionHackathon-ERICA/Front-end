import React from "react";

export default function ProblemCard() {
  const date = new Date().toLocaleDateString();
  return (
    <section className="flex rounded-xl relative items-start ring-1 ring-gray-300 overflow-hidden gap-2">
      <div className="flex-none flex w-[50px] h-[80px] bg-white border-sky border-2 rounded-l-xl text-center items-center justify-center">
        <h2 className="text-sky">인터넷</h2>
      </div>
      <p className="flex flex-1 flex-col">
        <span className="text-sm text-gray-400 self-end absolute right-22 top-1">
          {date}
        </span>
        <span className="text-primary">제목</span>
        <h2 className="line-clamp-2 text-md">유튜브 계정 만들기 어려워요</h2>
        {/* //나와의 거리 */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-md">거리</span>
          <span className="text-md text-gray-400">200m</span>
        </div>
      </p>
      <div className="rounded-r-xl w-[60px] h-[80px] bg-primary flex items-center justify-center">
        <h1 className="text-white tracking-wider">매칭중</h1>
      </div>
    </section>
  );
}
