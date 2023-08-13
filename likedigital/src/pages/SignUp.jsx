import React, { useState } from "react";
import { registerAuth } from "../util";

const LABEL_STYLE = "block text-md mb-2";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    user_type: "provider",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    registerAuth(formData);
  };

  return (
    <div className="bg-white p-8 rounded-md shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-primary text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        <label className={LABEL_STYLE} htmlFor="username">
          이름
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <label className={LABEL_STYLE} htmlFor="email">
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <label className={LABEL_STYLE} htmlFor="password1">
          비밀번호
        </label>
        <input
          name="password1"
          id="password1"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <label className={LABEL_STYLE} htmlFor="password2">
          비밀번호 확인
        </label>
        <input
          name="password2"
          id="password2"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <label className={LABEL_STYLE} htmlFor="userType">
          가입 목적
        </label>
        <select
          name="userType"
          id="userType"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        >
          <option value="provider">도움 제공</option>
          <option value="assistant">도움 받기</option>
        </select>
        <label className={LABEL_STYLE} htmlFor="phone_number">
          전화번호
        </label>
        <input
          type="tel"
          name="phone_number"
          id="phone_number"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-primary text-white p-2 w-full rounded"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default SignUp;
