import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaLocationArrow } from "react-icons/fa";
import { RiCalendarLine } from "react-icons/ri";

const RecentBills = () => {
  const [recentData, setRData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/recentBills");
      const data1 = await res.json();
      setRData(data1);
    };

    fetchData();
  }, []);

  const handleButtonClick = (data) => {
    const month1 = format(new Date(data.date), "MM");
    const month2 = new Date().getMonth() + 1;

    if (month1 == month2) {
      navigate(`/bills/${data._id}`);
    } else if (month1 > month2) {
      toast("The billing month hasn't arrived yet.");
    } else {
      toast("The billing month has already passed.");
    }
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
    </div>
  );
};

export default RecentBills;
