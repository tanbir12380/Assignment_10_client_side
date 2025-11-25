import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";

const BillDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState({});

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
  return (
    <div>
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
              <button className="btn-primary">Pay Now</button>
              <button className="btn-secondary">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
