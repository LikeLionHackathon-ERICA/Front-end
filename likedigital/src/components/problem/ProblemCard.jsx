import { useNavigate } from "react-router-dom";

export default function ProblemCard({
  category,
  title,
  phoneNumber,
  distance,
  status,
  user,
  id,
}) {
  const navigate = useNavigate();
  const HandleMatchingPost = (id) => {
    localStorage.setItem("PostId", id);
    navigate(`/posts/${id}`);
  };
  return (
    <section className="flex flex-col pt-2 pb-4 px-3 border-b-2 border-gray-300 gap-[0.5px] relative">
      <div className="flex items-center justify-between mb-1">
        <h2>{user}</h2>
        <div className="flex items-center gap-2">
          <span>{distance}m</span>
          <span className="rounded-full text-purple-500 px-4 py-[1px] text-md font-semibold">
            {category}
          </span>
        </div>
      </div>
      <h2 className="line-clamp-2 px-4 py-2 rounded-lg text-primary font-bold text-lg bg-white border-2 border-gray-300 my-1">
        {title}
      </h2>
      <button
        className="bg-primary text-white text-lg text-center w-full rounded-lg py-1"
        onClick={() => HandleMatchingPost(id)}
      >
        매칭하기
      </button>
    </section>
  );
}
