import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col gap-[1px] justify-center items-center bg-white p-4 rounded-xl shadow-xl w-full max-w-sm mx-4 text-center border-2 border-primary relative">
        <div
          className="text-red-500 text-[60px] font-bold
              absolute left-3 top-3
        "
        >
          <AiOutlineExclamationCircle />
        </div>
        <h3 className="text-4xl font-semibold text-primary mb-4">에러</h3>
        <p className="text-xl mb-6 text-gray-600 font-bold">
          잘못된 접근입니다
        </p>
        <button
          onClick={handleGoBack}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold animate-bounce"
        >
          처음화면으로 돌아가기
        </button>
      </div>
    </div>
  );
}
