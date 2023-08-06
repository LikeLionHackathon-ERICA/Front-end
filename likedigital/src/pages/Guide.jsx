import React from "react";
import { Routes, Route } from "react-router-dom";

import guideslide from "../assets/guide-slide.png";

function User({ user }) {
  return (
    <div className="guide-container">
      <h3 className="problem1" style={{ display: "flex" }}>
        <div style={{ color: "#FFBF47" }}>{user.username}</div>님을 위한 피드
        추천
      </h3>
      <div className="guide-box">
        <h3>초보 자영업자를 위한 POS 활용 가이드</h3>
      </div>
      {/* 슬라이드 효과 미구현 */}
      <img
        src={guideslide}
        alt="guideslide"
        style={{ margin: "auto", display: "block", width: "10%" }}
      />
    </div>
  );
}

function Guide() {
  const users = [
    {
      id: 1,
      username: "안녕안녕",
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <User user={user} />
      ))}
    </div>
  );
}

export default Guide;
