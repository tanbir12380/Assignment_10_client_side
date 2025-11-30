import React, { useEffect } from "react";
import Carousal from "./Carousal";
import RecentBills from "./RecentBills";
import Banner from "./Banner";
import WhyChooseUs from "./whyChooseUs";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Home = () => {
  const { user, setUserLocation } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setUserLocation(location.pathname);
    }
  }, [setUserLocation, user]);

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
