import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import { NavLink } from "react-router";

export default function Carousal() {
  return (
    <div
      style={{
        height: "600px",
        zIndex: "1",
      }}
    >
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide className=" slides slide2">
          <div>
            <h3>Water is life</h3>
            <p>Fix leaks, reduce wastage, and use only what you truly need.</p>
            <NavLink to="/bills" className="btn-primary btn-primary1">
              Pay Bill
            </NavLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" slides slide3">
          <div>
            <h3>Every watt matters</h3>
            <p>
              Switch off lights and appliances when not in use — save energy,
              save money.
            </p>
            <NavLink to="/bills" className="btn-primary btn-primary1">
              Pay Bill
            </NavLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slides slide1">
          <div>
            <h3>Use the internet wisely</h3>
            <p>
              Your data is a resource, avoid unnecessary streaming and downloads
              to reduce digital waste.
            </p>
            <NavLink to="/bills" className="btn-primary btn-primary1">
              Pay Bill
            </NavLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" slides slide4">
          <div>
            <h3>Save gas, save the planet</h3>
            <p>Cook efficiently and turn off burners the moment you're done.</p>
            <NavLink to="/bills" className="btn-primary btn-primary1">
              Pay Bill
            </NavLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
