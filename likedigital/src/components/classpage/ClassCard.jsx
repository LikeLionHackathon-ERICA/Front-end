import { useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsFillPersonFill, BsX } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

const BUTTON_STYLE =
  "group relative flex justify-center p-1 border border-transparent text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary";
const DETAIL_CARD =
  "flex flex-col items-center p-1 rounded-lg ring-2 ring-primary";
export default function ClassCard({ classes }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const openModal = (item) => {
    setSelectedClass(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClass(null);
  };
  return (
    <div className="flex flex-col gap-4">
      {classes?.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 shadow-md items-center ring-gray-300 ring-2 rounded-md p-3 px-2"
        >
          <div className="flex items-center justify-between w-full">
            <h1 className="py-2 px-2 line-clamp-1 ring-2 font-bold rounded-md text-textGray">
              {item.title}
            </h1>
            <p className="text-md p-2 text-primary">{item.category}</p>
          </div>
          <div className="w-full flex justify-between items-center gap-4 px-1">
            <button
              className={`flex items-center ${BUTTON_STYLE} ring-gray-400 ring-2 gap-1`}
            >
              <IoLocationSharp />
              {item.location}
            </button>
            <div className={`${BUTTON_STYLE} flex items-center gap-1 text-md`}>
              <BsFillPersonFill /> {item.matching_users.length} /{" "}
              {item.capacity}
            </div>
            <button
              onClick={() => openModal(item)}
              className={`${BUTTON_STYLE} bg-white text-textGray px-3 ring-2 ring-primary`}
            >
              내용 보기
            </button>
          </div>
        </div>
      ))}
      {showModal && selectedClass && (
        <div
          className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-60 flex items-end"
          onClick={closeModal}
        >
          <div
            className="flex flex-col gap-6 bg-white border-4 border-b-0 border-x-[1px] border-primary rounded-t-[50px] w-full p-8 h-[70%] transition-transform transform translate-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-2 right-3">
              <BsX size={48} />
            </button>
            <h2 className="text-2xl mt-4 pt-2 text-center font-bold">
              {selectedClass.title}
            </h2>
            <span
              className={`flex items-center rounded-md p-1 text-lg justify-center  ring-gray-400 ring-2 gap-1`}
            >
              <IoLocationSharp className="text-primary" size={24} />
              {selectedClass.location}
            </span>
            <article className="text-lg flex-wrap flex flex-col gap-4">
              <p className={`${DETAIL_CARD} gap-2 py-2`}>
                <span className="text-xl text-textGray mt-2 border-b-2 border-primary pb-[2px]">
                  강좌 소개
                </span>
                <span className="px-4">{selectedClass.description}</span>
              </p>

              <p className={DETAIL_CARD}>
                <span className="text-lg text-gray-500">기간</span>
                <span className="text-xl font-semibold">
                  {selectedClass.startDate} ~ {selectedClass.endDate}
                </span>
              </p>
              <p className={DETAIL_CARD}>
                <span className="text-lg text-gray-500">신청 인원</span>
                <span className="text-xl font-semibold">
                  {selectedClass.matching_users.length} /{" "}
                  {selectedClass.capacity}
                </span>
              </p>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${selectedClass.user.phone_number}`}
                  className="flex items-center gap-2 justify-center px-4 py-2 text-white bg-primary rounded-md"
                >
                  <BiSolidPhoneCall />
                  전화문의
                </a>
                <button className="flex items-center justify-center px-4 py-2 text-white bg-primary rounded-md">
                  신청하기
                </button>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
