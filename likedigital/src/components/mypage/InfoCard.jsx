export default function InfoCard({ title, content }) {
  if (title === "유저 타입") {
    if (content === "provider") {
      content = "제공자";
    } else {
      content = "요청자";
    }
  }
  return (
    <div className="flex flex-col items-center text-center justify-center gap-1 px-4 py-3 border border-primary  bg-white rounded-lg w-1/3">
      <span className="text-gray-400 text-sm">{title}</span>
      <span className="text-textGray text-md font-bold">{content}</span>
    </div>
  );
}
