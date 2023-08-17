export default function ProblemCard({
  category,
  title,
  phoneNumber,
  distance,
  status,
  user,
}) {
  return (
    <section className="flex flex-col py-4 px-3 border-b-2 border-gray-300 gap-2 relative">
      <div className="flex items-center justify-between">
        <h2>{user}</h2>
        <span className="rounded-full bg-sky text-white px-4 py-[1px] text-sm font-semibold">
          {category}
        </span>
        <span>{distance}</span>
      </div>
      <h2 className="line-clamp-2 px-4 py-3 rounded-md bg-gray-200 border-2 border-gray-300">
        {title}
      </h2>
    </section>
  );
}
