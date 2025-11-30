import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router";
import { FaLocationArrow } from "react-icons/fa";
import { RiCalendarLine } from "react-icons/ri";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
const AllBills = () => {
  const { user, setUserLocation } = useContext(AuthContext);

  const [recentData, setRData] = useState([]);
  const [loader1, setLoader1] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      setUserLocation(location.pathname);
    }

    const fetchData = async () => {
      setLoader1(true);
      const res = await fetch(
        "https://utility-billing-app-server.vercel.app/bills"
      );
      const data1 = await res.json();
      setRData(data1);
      setTimeout(() => {
        setLoader1(false);
      }, 500);
    };

    fetchData();
  }, []);

  const handleCategorySelect = async (category) => {
    setLoader1(true);
    const res = await fetch(
      `https://utility-billing-app-server.vercel.app/billsCategory/${category}`
    );
    const data1 = await res.json();
    setRData(data1);
    setTimeout(() => {
      setLoader1(false);
    }, 500);
  };

  const handleButtonClick = (data) => {
    navigate(`/bills/${data._id}`);
  };

  return (
    <div className="recent-bills">
      <h2
        style={{
          textAlign: "center",
        }}
        className="recent-bills-title"
      >
        All Bills
      </h2>

      <div
        className="filter-by-cate"
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px auto",
        }}
      >
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn">
            <p>Select Category</p>{" "}
            <FaArrowDown
              style={{
                transform: "scale(1.2)",
                marginLeft: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <ul tabIndex="-1" className="dropdown-content menu ">
            <li>
              <button
                onClick={() => {
                  handleCategorySelect("electricity");
                }}
              >
                Electricity
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleCategorySelect("water");
                }}
              >
                Water
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleCategorySelect("gas");
                }}
              >
                Gas
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleCategorySelect("internet");
                }}
              >
                Internet
              </button>
            </li>
          </ul>
        </div>
      </div>

      {loader1 ? (
        <div
          className="loaders3"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="loading loading-bars loading-xl"></span>
          <span className="loading loading-bars loading-xl"></span>
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <div className="recent-bills-list">
          {recentData.map((data, index) => (
            <div className="bill-card" key={index}>
              <div className="bill-image">
                <img src={data.image} alt={data.title} />
              </div>
              <div className="bill-details">
                <h4 className="bill-title">{data.title}</h4>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <p className="bill-category-pro">{data.category}</p>
                  <div className="bill-date-pro">
                    <FaLocationArrow />

                    <p>{data.location}</p>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }} className="bill-date-pro">
                  <RiCalendarLine />
                  <p>{format(new Date(data.date), "dd/MM/yy")}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleButtonClick(data);
                }}
                className="btn-primary"
              >
                See Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBills;
