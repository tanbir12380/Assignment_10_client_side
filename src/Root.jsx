import React, { useEffect } from "react";
import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Root = () => {
  useEffect(() => {
    document.body.classList.add("theme-light");
  }, []);

  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
