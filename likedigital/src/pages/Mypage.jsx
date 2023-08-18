import { useEffect, useState } from "react";
import HeaderTitle from "../components/UI/HeaderTitle";
import { GrLocation } from "react-icons/gr";
import InfoCard from "../components/mypage/InfoCard";
import { useProfile } from "../context/ProfileProvider";
import { useFetchClasses } from "../hook/useFetchClasses";
import { getAllProblem, getMyProfile } from "../util";
function Mypage() {
  const { profile, locationName } = useProfile();
  const [isSolved, setIsSolved] = useState(true);
  const { classes, loading } = useFetchClasses();
  const [titleChange, setTitleChange] = useState(false);
  const [titles, setTitles] = useState(null);

  const handleTestButtonClick = async () => {
    try {
      setTitleChange(false);
      const result = await getMyProfile();
      const titlesArray = await result.posts.map((post) => post.title);
      setTitles(titlesArray);
    } catch (error) {
      console.error("Error uploading problem:", error);
    }
  };

  useEffect(() => {
    handleTestButtonClick();
  }, []);
  if (!profile) {
    return <div>에러가 있습니다.</div>;
  }
  return (
    <section>
      <HeaderTitle />
      <div className="w-full flex items-center px-8 gap-4 mt-8">
        <img className="w-24 h-24" src="imgs/profile1.png" alt="profile" />
        <div className="flex flex-col justify-between items-center gap-2">
          <h2 className="text-textGray pb-[0.5px] border-b-[3px] border-primary w-fit text-lg">
            <span className=" text-gray-400">이름 : </span>
            {profile.username}
          </h2>
          <div className="w-full text-gray-500 flex items-center py-1 px-3 gap-1 shadow-md border-t-2 rounded-full text-sm whitespace-nowrap justify-center">
            <GrLocation />
            <span>{locationName}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 px-8 shadow-md rounded-b-xl">
        <div className="flex items-center gap-4 px-2">
          <InfoCard title="유저 타입" content={profile.user_type} />
          <InfoCard title="누적 도움" content={profile.score} />
          <InfoCard title="누적 도움" content={profile.score} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 mt-6 px-8">
        <div className="flex items-center justify-between w-full mb-2">
          <h2 className="text-textGray text-lg font-bold">내가 쓴 글</h2>
          <button className="text-primary text-sm font-bold">더보기</button>
        </div>
        {titles?.map((title, index) => (
          <PostCard key={index} isSolved={isSolved} title={title} />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-6 px-8">
        <div className="flex items-center justify-between w-full mb-2">
          <h2 className="text-textGray text-lg font-bold">신청한 클래스</h2>
          <button className="text-primary text-sm font-bold">더보기</button>
        </div>
        {classes.map((title, index) => (
          <PostCard key={index} isSolved={isSolved} title={title.title} />
        ))}
      </div>
    </section>
  );
}

export default Mypage;

function PostCard({ isSolved, title }) {
  return (
    <div
      className={`w-full
          ${
            isSolved
              ? "bg-question border-yellow-300"
              : "bg-gray-400 border-gray-500"
          }
           flex gap-4 p-2 px-3 rounded-lg border-2`}
    >
      <img src="imgs/question.png" alt="" className=" object-contain" />
      <span className="text-lg">{title}</span>
    </div>
  );
}
