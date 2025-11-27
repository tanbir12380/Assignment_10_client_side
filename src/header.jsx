import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./AuthContext";
import { Tooltip } from "react-tooltip";
import Switch from "./themeToggole";

const Header = () => {
  const { user, SignOutFromApp } = useContext(AuthContext);
  const PLACES = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
  ];
  return (
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
          alt="Logo"
        />
      </div>

      <ul className="hidden md:flex items-center text-lg font-medium">
        <li className="cursor-pointer">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="cursor-pointer">
          <NavLink to="/bills">Bills</NavLink>
        </li>

        <Switch></Switch>

        {user && (
          <>
            <li className="cursor-pointer">
              <NavLink to="/mybills">My Bills</NavLink>
            </li>

            <li
              id="profile-tooltip"
              style={{
                marginLeft: "8px",
                marginRight: "8px",
              }}
              className="cursor-pointer"
            >
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-9 h-9 rounded-full border"
              />
            </li>

            <Tooltip
              anchorSelect="#profile-tooltip"
              content={user.displayName}
            />

            <li
              onClick={() => {
                SignOutFromApp().catch((error) => console.log(error));
              }}
              className="text-white px-4 py-1 rounded-lg cursor-pointer"
            >
              Logout
            </li>
          </>
        )}

        {!user && (
          <>
            <li className="cursor-pointer">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
