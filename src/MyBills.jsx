import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./MyBills.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const MyBills = () => {
  const { user } = useContext(AuthContext);

  const [mybill, setmybill] = useState([]);
  const [mybillCurrent, setmybillCurrent] = useState({});
  const [toggle, settoggle] = useState(false);

  const btn_ref = useRef();

  // ============================
  // FETCH USER BILLS
  // ============================
  useEffect(() => {
    fetch(`http://localhost:3000/mybills/${user.email}`)
      .then((res) => res.json())
      .then((data1) => {
        setmybill(data1);
        btn_ref.current.close();
      });
  }, [user, toggle]);

  // ============================
  // HANDLE UPDATE SUBMIT
  // ============================
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      email: e.target.email.value,
      billsId: e.target.id.value,
      amount: parseInt(e.target.amount.value),
      date: new Date(e.target.date.value).toISOString(),
      username: e.target.name.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };

    fetch(`http://localhost:3000/mybills/${mybillCurrent._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after update --->", data);

        settoggle(!toggle);

        btn_ref.current.close(); // close the modal
      });
  };

  // ============================
  // DELETE BILL
  // ============================
  const handleDeleteReq = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        fetch(`http://localhost:3000/mybills/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            settoggle(!toggle);
          })
          .catch((err) => console.error("Error deleting bill:", err));
      }
    });
  };

  return (
    <>
      {/* ============= MODAL OUTSIDE OF MAP ============= */}

      <div>
        <h2
          style={{
            textAlign: "center",
          }}
          className="recent-bills-title"
        >
          All Bills
        </h2>
        <dialog ref={btn_ref} id="my_modal_1" className="modal">
          <div className="modal-box w-3/4">
            <div className="paybill-container">
              <h2 className="form-title">Update Bill</h2>

              <form onSubmit={handleFormSubmit} className="paybill-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user?.email}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Bill ID</label>
                  <input
                    type="text"
                    name="id"
                    defaultValue={mybillCurrent.billsId}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={mybillCurrent.amount}
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={
                      mybillCurrent.date
                        ? new Date(mybillCurrent.date)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="name"
                    readOnly
                    defaultValue={mybillCurrent.username}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    defaultValue={mybillCurrent.address}
                    name="address"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={mybillCurrent.phone}
                  />
                </div>

                <button className="submit-btn" type="submit">
                  Save Changes
                </button>
              </form>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* ============= BILLS LIST ============= */}
        {mybill.map((details) => (
          <div className="bill-card" key={details._id}>
            <div className="bill-card-content">
              <h2>Bill Information</h2>

              <div className="bill-info-grid">
                <p>
                  <span>User:</span> {details.username}
                </p>
                <p>
                  <span>Phone:</span> {details.phone}
                </p>

                <p>
                  <span>Address:</span> {details.address}
                </p>
                <p>
                  <span>Email:</span> {details.email}
                </p>

                <p>
                  <span>Amount:</span> {details.amount} BDT
                </p>
                <p>
                  <span>Date:</span>{" "}
                  {new Date(details.date).toLocaleDateString()}
                </p>

                <p>
                  <span>Bill ID:</span> {details.billsId}
                </p>
                <p>
                  <span>ID:</span> {details._id}
                </p>
              </div>

              <div className="bill-buttons">
                <button
                  onClick={() => {
                    setmybillCurrent(details);
                    btn_ref.current.showModal();
                  }}
                  className="update-btn"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDeleteReq(details._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyBills;
