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
  const [totalPay, setTotalPay] = useState(0);
  const [loader, setLoader] = useState(true);

  const btn_ref = useRef();

  useEffect(() => {
    fetch(`http://localhost:3000/mybills/${user.email}`)
      .then((res) => res.json())
      .then((data1) => {
        setmybill(data1);
        let totalTemp = 0;
        data1.map((data) => {
          console.log(data.amount);
          totalTemp = totalTemp + parseInt(data.amount);
        });

        setTotalPay(totalTemp);
        setTimeout(() => {
          setLoader(false);
        }, 500);
      });
  }, [user, toggle]);

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

        Swal.fire("Bill is updated successfully", "", "success");
        settoggle(!toggle);

        btn_ref.current.close();
      });
  };

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
      <h2
        style={{
          textAlign: "center",
        }}
        className="recent-bills-title"
      >
        My Bills
      </h2>

      {loader ? (
        <div
          className="loaders3"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1px",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        >
          <span className="loading loading-bars loading-xl"></span>
          <span className="loading loading-bars loading-xl"></span>
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <>
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
                      type="number"
                      name="phone"
                      defaultValue={mybillCurrent.phone}
                    />
                  </div>

                  <div
                    style={{
                      gridColumn: "span 2",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button className="btn-primary1 btn-primary" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button className="btn-primary btn-primary1">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>

          <div className="bill-card-containers">
            <div className="table-container-div">
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>Bill ID</th>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Amount (BDT)</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {mybill.map((details) => (
                    <tr key={details._id}>
                      <td>{details.billsId}</td>
                      <td>{details.username}</td>
                      <td>{details.phone}</td>
                      <td>{details.address}</td>
                      <td>{details.email}</td>

                      <td>{new Date(details.date).toLocaleDateString()}</td>
                      <td>{details.amount}</td>

                      <td>
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
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total bill count</td>
                    <td>{mybill.length}</td>
                    <td colSpan={4}>Total bill paid</td>
                    <td colSpan={2}>{totalPay} TK</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {mybill.map((details) => (
              <div className="mybill-card" key={details._id}>
                <div className="mybill-card-content">
                  <h2>Bill Information</h2>

                  <div className="mybill-info-grid">
                    <p>
                      <span>Bill ID:</span> {details.billsId}
                    </p>
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
            <div className="mybill-card-total">
              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <h2>Total bill count :</h2>
                <p>{mybill.length}</p>
              </div>

              <div>
                <h2>Total bill amount :</h2>
                <p>{totalPay} TK</p>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "200px",
              margin: "10px auto",
            }}
          >
            <button className="btn-primary">Download PDF</button>
          </div>
        </>
      )}
    </>
  );
};

export default MyBills;
