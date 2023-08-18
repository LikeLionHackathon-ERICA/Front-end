import React from "react";
import { Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../App.css";

function User({ user }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "dots_custom",
  };

  return (
    <div className="guide-container">
      <h3 className="problem1" style={{ display: "flex" }}>
        <div style={{ color: "#FFBF47" }}>{user.username}</div>님을 위한 피드
        추천
      </h3>

      <Slider {...settings}>
        <div className="guide-box">
          <h3>초보 자영업자를 위한 POS 활용 가이드 1</h3>
        </div>
        <div className="guide-box">
          <h3>초보 자영업자를 위한 POS 활용 가이드 2</h3>
        </div>
        <div className="guide-box">
          <h3>초보 자영업자를 위한 POS 활용 가이드 3</h3>
        </div>
      </Slider>
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
