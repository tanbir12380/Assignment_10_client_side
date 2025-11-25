import React from "react";
import Carousal from "./Carousal";
import RecentBills from "./RecentBills";
import Banner from "./Banner";
import WhyChooseUs from "./whyChooseUs";

const Home = () => {
  return (
    <>
      <Carousal></Carousal>
      <Banner></Banner>
      <RecentBills></RecentBills>
      <WhyChooseUs></WhyChooseUs>
    </>
  );
};

export default Home;
