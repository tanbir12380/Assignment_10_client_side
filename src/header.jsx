import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <>
      <nav
        style={{
          backgroundColor: "rgba(11, 68, 184)",
        }}
        className="w-full shadow-md px-6 py-3 flex items-center justify-between"
      >
        <div className="text-2xl font-bold tracking-wide">
          <img
            style={{
              height: "50px",
            }}
            src="logo.png"
            alt=""
          />
        </div>

        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/bills">Bills</Link>  
          </li>
          <li className="hover:text-blue-600 cursor-pointer">My Pay Bills</li>
          <li className="hover:text-blue-600 cursor-pointer">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-9 h-9 rounded-full border"
            />
          </li>
          <li className="bg-red-500 text-white px-4 py-1 rounded-lg cursor-pointer hover:bg-red-600">
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
