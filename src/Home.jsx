import React from "react";
import Carousal from "./Carousal";
import RecentBills from "./RecentBills";
import Banner from "./Banner";

const Home = () => {
  return (
    <>
      <Carousal></Carousal>
      <Banner></Banner>
      <RecentBills></RecentBills>
    </>
  );
};

export default Home;
