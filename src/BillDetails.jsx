import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const btn_ref = useRef();

  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const [buttonState, setButtonState] = useState("present");
  const [disableBtn, setDisableBtn] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDate1 = new Date().toISOString();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://utility-billing-app-server.vercel.app/bills/${id}`
      );
      const data1 = await res.json();
      setDetails(data1);

      const month1 = Number(format(new Date(data1.date), "MM"));
      const month2 = new Date().getMonth() + 1;

      if (month1 == month2) {
        setButtonState("present");
        setDisableBtn(false);
      } else if (month1 > month2) {
        setButtonState("future");
        setDisableBtn(true);
      } else {
        setButtonState("past");
        setDisableBtn(true);
      }

      setTimeout(() => {
        setLoader(false);
      }, 500);
    };

    fetchData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const billsId = e.target.id.value;
    const amount = parseInt(e.target.amount.value);
    const date = currentDate1;
    const username = e.target.name.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;

    const dataObj = {
      email,
      billsId,
      amount,
      date,
      username,
      address,
      phone,
    };

    await fetch("https://utility-billing-app-server.vercel.app/mybills", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((data) => {});

    Swal.fire("Bill is paid successfully", "", "success");

    btn_ref.current.close();
  };

  if (loader) {
    return (
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
    );
  } else {
    return (
      <div>
        <dialog ref={btn_ref} id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="paybill-container">
              <h2 className="form-title">Pay Bill</h2>

              <form onSubmit={handleFormSubmit} className="paybill-form">
                {/* Auto-filled Fields */}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Bill ID</label>
                  <input
                    type="text"
                    name="id"
                    defaultValue={details._id}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={details.amount}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={currentDate}
                    readOnly
                  />
                </div>

                {/* Editable Fields */}
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="paybill-btn1">
                  <button
                    style={{
                      padding: "0px !important",
                    }}
                    className="btn-primary btn-primary1 "
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className=" btn-primary btn-primary1">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <div className="bill-details-page">
          <div className="bill-details-card">
            <div className="bill-details-image">
              <img src={details.image} alt={details.title} />
            </div>

            <div className="bill-details-content">
              <h1 className="bill-title">{details.title}</h1>
              <p className="bill-description">{details.description}</p>
              <p className="bill-category">
                Category: <span>{details.category}</span>
              </p>
              <p className="bill-email">
                Email: <span>{details.email}</span>
              </p>
              <p className="bill-location">
                Location: <span>{details.location}</span>
              </p>

              {details?.date && (
                <p className="bill-date">
                  Date:{" "}
                  <span>{format(new Date(details.date), "dd/MM/yy")}</span>
                </p>
              )}

              <p className="bill-amount">
                Amount: <span>{details.amount} BDT</span>
              </p>

              <div className="bill-buttons">
                <button
                  style={{
                    width: "200px !important",
                  }}
                  disabled={disableBtn}
                  onClick={() => {
                    btn_ref.current.showModal();
                  }}
                  className="btn-primary"
                >
                  {buttonState === "present"
                    ? "Pay Now"
                    : buttonState === "past"
                    ? "Payment Overdue"
                    : "Upcoming Bill"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BillDetails;
