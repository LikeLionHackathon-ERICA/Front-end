import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
export default function ClassCard({ classes }) {
  const BUTTON_STYLE =
    "group relative flex justify-center p-1 border border-transparent text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary";
  return (
    <div className="flex flex-col gap-4">
      {classes.map((item, index) => (
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
              className={`${BUTTON_STYLE} bg-white text-textGray px-3 ring-2 ring-primary`}
            >
              내용 보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
