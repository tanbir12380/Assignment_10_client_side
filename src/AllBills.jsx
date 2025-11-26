import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const AllBills = () => {
  const [recentData, setRData] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/bills");
      const data1 = await res.json();
      setRData(data1);
      setTimeout(() => {
        setLoader(false);
      }, 0);
    };

    fetchData();
  }, []);

  const handleButtonClick = (data) => {
    const month1 = format(new Date(data.date), "MM");
    const month2 = new Date().getMonth() + 1;

    console.log(month1, month2, "from allBillsPage,line 25");

    if (month1 == month2) {
      navigate(`/bills/${data._id}`);
    } else if (month1 > month2) {
      toast("The billing month hasn't arrived yet.");
    } else {
      toast("The billing month has already passed.");
    }
  };

  if (loader) {
    return (
      <div
        style={{
          width: "100%",
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
      >
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
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
        <div className="recent-bills-list">
          {recentData.map((data, index) => (
            <div className="bill-card" key={index}>
              <div className="bill-image">
                <img src={data.image} alt={data.title} />
              </div>
              <div className="bill-details">
                <h4 className="bill-title">{data.title}</h4>
                <p>Category: {data.category}</p>
                <p>Location: {data.location}</p>
                <p>Date: {format(new Date(data.date), "dd/MM/yy")}</p>
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
  }
};

export default AllBills;
