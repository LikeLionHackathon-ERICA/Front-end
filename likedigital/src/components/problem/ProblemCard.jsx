import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

export default function ProblemCard({
  category,
  title,
  phoneNumber,
  distance,
  status,
}) {
  return (
    <section className="flex rounded-xl border border-gray-600 shadow-md h-[80px] overflow-hidden">
      <div className="flex-none w-[50px] bg-sky text-center flex items-center justify-center">
        <h2 className="text-white text-sm font-semibold">{category}</h2>
      </div>
      <div className="flex flex-1 flex-col justify-center p-2">
        <h2 className="line-clamp-2 text-base font-medium text-black mb-1 truncate">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>
            <BsFillTelephoneFill />
          </span>
          <span>{phoneNumber}</span>
          <span className="text-primary font-medium">{distance}</span>
        </div>
      </div>
      <div
        className={`flex-none w-[60px] flex items-center justify-center ${
          status === "대기중" ? "bg-yellow-400" : "bg-green-500"
        }`}
      >
        <h1 className="text-white text-sm tracking-wider font-semibold">
          {status}
        </h1>
      </div>
    </section>
  );
}
