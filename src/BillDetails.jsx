import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { AuthContext } from "./AuthContext";

const BillDetails = () => {
  const { id } = useParams();
   const {user} = useContext(AuthContext);
  const btn_ref = useRef();

  const [details, setDetails] = useState({});

    const currentDate = new Date().toISOString().split("T")[0];
     const currentDate1 = new Date().toISOString();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/bills/${id}`);
      const data1 = await res.json();
      setDetails(data1);
    };

    fetchData();
  }, [id]);

  console.log(id);
  console.log(details);

  const handleFormSubmit = async (e) =>{

    e.preventDefault();

const email= e.target.email.value;
const billsId = e.target.id.value;
const amount = parseInt(e.target.amount.value);
const date =  currentDate1;
const username = e.target.name.value;
const address = e.target.address.value;
const phone = e.target.phone.value;
const additional = e.target.additional.value;

const dataObj = {
email,billsId,amount,date,username,address,phone,additional
}

console.log(dataObj);

        await fetch("http://localhost:3000/mybills", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("posted data ->", data);
      });
  }

  return (
    <div>


{/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
<dialog ref={btn_ref} id="my_modal_1" className="modal">
  <div className="modal-box">
           <div className="paybill-container">
      <h2 className="form-title">Pay Bill</h2>

      <form onSubmit={handleFormSubmit} className="paybill-form">
        
        {/* Auto-filled Fields */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} readOnly />
        </div>

        <div className="form-group">
          <label>Bill ID</label>
          <input type="text" name="id" value={details._id} readOnly />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={details.amount} readOnly />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={currentDate} readOnly />
        </div>

        {/* Editable Fields */}
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="name" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter your address" />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" placeholder="Enter your phone number" />
        </div>

        <div className="form-group">
          <label>Additional Info</label>
          <textarea name="additional" placeholder="Additional comments (optional)"></textarea>
        </div>

        <button className="submit-btn" type="submit">Pay Now</button>
      </form>
    </div>
    <div className="modal-action">

      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

      <div className="bill-details-page">
        <div className="bill-details-card">
          {/* Image */}
          <div className="bill-details-image">
            <img src={details.image} alt={details.title} />
          </div>

          {/* Details */}
          <div className="bill-details-content">
            <h1 className="bill-title">{details.title}</h1>
            <p className="bill-category">
              Category: <span>{details.category}</span>
            </p>
            <p className="bill-email">
              Email: <span>{details.email}</span>
            </p>
            <p className="bill-location">
              Location: <span>{details.location}</span>
            </p>
            <p className="bill-description">{details.description}</p>
            {details?.date && (
              <p className="bill-date">
                Date: <span>{format(new Date(details.date), "dd/MM/yy")}</span>
              </p>
            )}

            <p className="bill-amount">
              Amount: <span>{details.amount} BDT</span>
            </p>

            <div className="bill-buttons">
              <button onClick={
                ()=>{
                  btn_ref.current.showModal()
                }
              } className="btn-primary">Pay Now</button>
              <button className="btn-secondary">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
