import React from "react";
import { Routes, Route } from "react-router-dom";

function Event() {
  return (
    <div className="event-container">
      <div className="event-section-1">
        <div className="event1">Event</div>
        <div className="event-section-2">
          <div className="event2">이벤트 기간 활동을 뫄뫄가 응원해요!</div>
          <div className="event3">본문 보기</div>
        </div>
        <div className="event4">
          <div style={{ color: "white" }}>1 / 9</div>
        </div>
      </div>
    </div>
  );
}

export default Event;
