import React from "react";
import { Routes, Route } from "react-router-dom";

import underline from "../assets/underline.png";
import togglewhite from "../assets/toggle-white.png";
import togglegray from "../assets/toggle-gray.png";

function MostQusetion() {
  return (
    <div className="mq_container">
      <h3 className="problem1">많이 검색한 질문</h3>

      <img src={underline} alt="guideslide" />
      <img src={togglewhite} alt="toggle-white" />
      <img src={togglegray} alt="toggle-gray" />
    </div>
  );
}

export default MostQusetion;
