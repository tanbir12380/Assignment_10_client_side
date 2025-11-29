import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaLocationArrow } from "react-icons/fa";
import { RiCalendarLine } from "react-icons/ri";

const RecentBills = () => {
  const [recentData, setRData] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const res = await fetch(
        "https://utility-billing-app-server.vercel.app/recentBills"
      );
      const data1 = await res.json();
      setRData(data1);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    };

    fetchData();
  }, []);

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
        Recent Bills
      </h2>
      {loader ? (
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

export default RecentBills;
