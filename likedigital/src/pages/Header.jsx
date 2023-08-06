import React from "react";
import { Routes, Route } from "react-router-dom";

import search from "../assets/search.png";

function Header() {
  return (
    <div className="header-container">
      <div className="title">MOAMOA</div>
      {/* 검색 버튼 기능 미구현 */}
      <div className="search">
        <img src={search} alt="search" />
      </div>
    </div>
  );
}

export default Header;
