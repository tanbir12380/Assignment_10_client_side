import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import "./MyBills.css";

const MyBills = () => {

const {user} = useContext(AuthContext);
const [mybill, setmybill]= useState([]);



useEffect(()=>{
      console.log(user);
      console.log('from mybill page');

        const fetchData = async () => {
        const res = await fetch(`http://localhost:3000/mybills/${user.email}`);
        const data1 = await res.json();
        mybill.push(data1);
        setmybill([...mybill]);
      }
  
      fetchData();

},[user])

  
console.log(mybill);

  return (
<>
{
  mybill.map((details)=>{


return(
     <div className="bill-card">
      
      {/* Left Image */}
      <div className="bill-card-image">
        <img
          src="/vite.svg"
          alt="bill"
        />
      </div>

      {/* Right Content */}
      <div className="bill-card-content">
        <h2>Bill Information</h2>

        <div className="bill-info-grid">
          <p><span>User:</span> {details.username}</p>
          <p><span>Phone:</span> {details.Phone}</p>

          <p><span>Address:</span> {details.Address}</p>
          <p><span>Email:</span> {details.email}</p>

          <p><span>Amount:</span> {details.amount} BDT</p>
          <p><span>Date:</span> {new Date(details.date).toLocaleDateString()}</p>

          <p><span>Bill ID:</span> {details.billsId}</p>
          <p><span>ID:</span> {details._id}</p>
        </div>

        <div className="bill-buttons">
          <button className="update-btn">Update</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>

)

  })
}

</>
  );
};

export default MyBills;