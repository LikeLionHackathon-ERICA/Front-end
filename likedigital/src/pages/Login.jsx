import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginAuth } from "../util";

const Login = () => {
  const { userType } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await LoginAuth(form);
      console.log("로그인 성공:", response.key);
      localStorage.setItem("token", `Token ${response.key}`);
      localStorage.setItem("username", form.username);
      localStorage.setItem("userType", userType);
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); // 예: 사용자의 홈 페이지나 대시보드로 변경하세요.
    }
  }, [navigate]);

  const commonInputStyle =
    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm";
  const buttonStyle =
    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary";

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only"></label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`${commonInputStyle} rounded-t-md`}
                placeholder="사용자 이름"
                value={form.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only"></label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={commonInputStyle}
                placeholder="이메일"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only"></label>
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className={`${commonInputStyle} rounded-b-md`}
                placeholder="비밀번호"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`${buttonStyle} tracking-wider text-xl`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-8 w-8 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "LOG IN / 확인"
              )}
            </button>
          </div>
        </form>
        <div
          id="signup"
          className="flex items-center justify-center mt-4 text-lg"
        >
          <span className="text-gray-600">계정이 없으신가요?</span>
          <Link to="/signup" className="text-primary ml-2 ">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
