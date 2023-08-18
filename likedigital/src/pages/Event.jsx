import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class Event extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    };

    return (
      <Slider {...settings}>
        <div className="event-container">
          <div className="event-section-1">
            <div className="event1">Event</div>
            <div className="event-section-2">
              <div className="event2">
                이벤트 기간 활동을 뫄뫄가 응원해요! 1
              </div>
              <div className="event3">본문 보기</div>
            </div>
            <div className="event4">
              <div style={{ color: "white" }}>1 / 3</div>
            </div>
          </div>
        </div>
        <div className="event-container">
          <div className="event-section-1">
            <div className="event1">Event</div>
            <div className="event-section-2">
              <div className="event2">
                이벤트 기간 활동을 뫄뫄가 응원해요! 2
              </div>
              <div className="event3">본문 보기</div>
            </div>
            <div className="event4">
              <div style={{ color: "white" }}>2 / 3</div>
            </div>
          </div>
        </div>
        <div className="event-container">
          <div className="event-section-1">
            <div className="event1">Event</div>
            <div className="event-section-2">
              <div className="event2">
                이벤트 기간 활동을 뫄뫄가 응원해요! 3
              </div>
              <div className="event3">본문 보기</div>
            </div>
            <div className="event4">
              <div style={{ color: "white" }}>3 / 3</div>
            </div>
          </div>
        </div>
      </Slider>
    );
  }
}

export default Event;
