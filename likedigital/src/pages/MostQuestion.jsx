import React from "react";
import { Routes, Route } from "react-router-dom";

import underline from "../assets/underline.png";
import toggle from "../assets/toggle.png";

function MostQusetion() {
  return (
    <div className="mq_container">
      <h3 className="problem1">많이 검색한 질문</h3>

      <img src={underline} alt="guideslide" />
      <img src={toggle} alt="toggle" />
    </div>
  );
}

export default MostQusetion;
