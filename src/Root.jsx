import React, { useEffect } from "react";
import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  useEffect(() => {
    document.body.classList.add("theme-light");
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="rootDiv"
    >
      <Header></Header>
      <div
        style={{
          flex: "1",
        }}
      >
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
