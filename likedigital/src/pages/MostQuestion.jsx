import React from "react";
import { Routes, Route } from "react-router-dom";

import underline from "../assets/underline.png";
import togglewhite from "../assets/toggle-white.png";
import togglegray from "../assets/toggle-gray.png";

function Rank({ user }) {
  return (
    <div className="question-box">
      <h3>{user.rank}</h3>
      <h3>{user.text}</h3>
      <img className="togglegray" src={togglegray} alt="togglegray" />
    </div>
  );
}

function MostQusetion() {
  const users = [
    {
      id: 1,
      rank: "01",
      text: "질문 1~~~",
    },
    {
      id: 2,
      rank: "02",
      text: "질문 2~~~",
    },
    {
      id: 3,
      rank: "03",
      text: "질문 3~~~",
    },
  ];

  return (
    <div className="mq_container">
      <h3 className="problem1">많이 검색한 질문</h3>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div>
            <button className="count-button1">최다 조회수</button>
            <img className="underline1" src={underline} alt="underline" />
          </div>
          <div>
            <button className="count-button2">공감수</button>
            <img className="underline2" src={underline} alt="underline" />
          </div>
        </div>
        <div style={{ marginTop: "18px" }}>
          <button className="sort-button">
            인기순{" "}
            <img className="togglewhite" src={togglewhite} alt="togglewhite" />
          </button>
        </div>
      </div>

      <div>
        {users.map((user) => (
          <Rank user={user} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="more-button">더보기</button>
      </div>
    </div>
  );
}

export default MostQusetion;
