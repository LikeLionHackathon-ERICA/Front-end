import React from "react";

const BTN_STYLE =
  "flex flex-col justify-center items-center gap-2 bg-opacity-20 border-[3px] rounded-xl py-6 px-3";
export default function SelectService() {
  return (
    <section className="flex flex-col h-[70vh] justify-between items-center py-8">
      <div className="w-[90%] py-[6px] bg-gray-300 rounded-full" />
      <h1 className="text-xl">어떤 서비스를 이용하시겠어요?</h1>

      <div className="flex justify-center items-center text-xl px-4 gap-2">
        <div className="flex flex-col">
          <img
            className="object-contain w-48 h-48"
            src="/imgs/Blue.png"
            alt="Bear"
          />
          <div className={`bg-sky border-sky ${BTN_STYLE}`}>
            <span className="text-sky">Question</span>
            <span>질문하러 왔어요</span>
          </div>
        </div>
        <div className="flex flex-col">
          <img
            className="object-contain w-48 h-48"
            src="/imgs/Green.png"
            alt="Bear"
          />
          <div className={`bg-primary border-primary ${BTN_STYLE}`}>
            <span className="text-primary">Answer</span>
            <span>해결하러 왔어요</span>
          </div>
        </div>
      </div>
    </section>
  );
}
