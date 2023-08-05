import React from "react";
import { Routes, Route } from "react-router-dom";

import bear1 from "../assets/bear1.png";
import question from "../assets/question.png";

function Problem() {
  return (
    <div className="problem-container">
      <div className="problem-section-1">
        <div className="problem1">뫄뫄가 처음이신가요?</div>
        <div className="problem2">전체 도움말</div>
      </div>
      <div className="problem-section-2">
        <div className="problem-box1">
          <h3 style={{ color: "#a0d0f1" }}>01</h3>
          <h3>문제 등록은 어떻게?</h3>
        </div>
        <div className="problem-box2">
          <h3 style={{ color: "#d1efdf" }}>02</h3>
          <h3>등록한 문제 어디서?</h3>
        </div>
      </div>
      <div className="problem-box3">
        <img
          className="question"
          src={question}
          alt="question"
          style={{ width: "15px" }}
        />
        <h3>다른 질문이 있어요!</h3>
        <img className="bear1" src={bear1} alt="bear1" />
      </div>
    </div>
  );
}

export default Problem;
