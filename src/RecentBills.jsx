import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { useNavigate } from 'react-router';

const RecentBills = () => {

  const [recentData, setRData]= useState([]);
 const navigate = useNavigate();

    useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/recentBills");
      const data1 = await res.json();
      setRData(data1);
    };

    fetchData();
  }, []);

  return (
   <div className="recent-bills">
  <h2 className="recent-bills-title">Recent Bills</h2>
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
          <button onClick={
            ()=>{
                navigate(`/bills/${data._id}`)
            }
          } className='btn-primary'>See Details</button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default RecentBills;