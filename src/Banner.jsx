import React from "react";

const Banner = () => {
  return (
<div

id="trusted-container"
  className="trusted-container"
>
  <h3 className="trusted-title">Trusted by Thousands, Built for Bangladesh</h3>

  <div className="card-container">
    <div className="trusted-card">
      <p className="trusted-label">Total Bills Processed</p>
      <h4 className="trusted-value">1.8M+</h4>
      <p className="trusted-sub">18% more than last month</p>
    </div>

    <div className="trusted-card">
      <p className="trusted-label">Verified User Accounts</p>
      <h4 className="trusted-value">420K+</h4>
      <p className="trusted-sub">32% growth this quarter</p>
    </div>

    <div className="trusted-card">
      <p className="trusted-label">Successful Payments</p>
      <h4 className="trusted-value">3.2M+</h4>
      <p className="trusted-sub">27% rise this month</p>
    </div>
  </div>
</div>

  );
};

export default Banner;
