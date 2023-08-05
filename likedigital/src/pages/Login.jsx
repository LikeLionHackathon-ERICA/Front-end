import { useState } from "react";
import { useParams } from "react-router-dom";

const Login = () => {
  const { userType } = useParams();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e) => setId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    //로그인 성공시
    // localStorage.setItem("userType", userType);
    // localStorage.setItem("id", id);
    // localStorage.setItem("password", password);
    console.log(`ID: ${id}, Password: ${password}`);
  };

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
              <label htmlFor="user-id" className="sr-only">
                ID
              </label>
              <input
                id="user-id"
                name="id"
                type="text"
                autoComplete="username"
                required
                className={`${commonInputStyle} rounded-t-md`}
                placeholder={userType === "provider" ? "ID" : "전화번호"}
                value={id}
                onChange={handleIdChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className={`${commonInputStyle} rounded-b-md`}
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className={buttonStyle}>
              LOG IN / 확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
