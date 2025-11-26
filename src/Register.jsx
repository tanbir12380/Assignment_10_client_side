import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "./AuthContext";

const Registration = () => {
  const { createUser } = useContext(AuthContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUser(email, password)
      .then((respose) => {
        console.log("user is created, here is the details", respose.user);
      })
      .catch((error) => {
        console.log("error found", error.message);
      });
  };
  return (
<div className="register-container">
  <div className="register-card">
    <form onSubmit={handleFormSubmit} className="register-form">
      <h2 className="register-title">Register</h2>

      <label>Name</label>
      <input type="text" name="name" placeholder="Enter name" />

      <label>Picture</label>
      <input type="text" name="picture" placeholder="Photo URL" />

      <label>Email</label>
      <input type="email" name="email" placeholder="Email Address" />

      <label>Password</label>
      <input type="password" name="password" placeholder="Password" />

      <label className="terms">
        <input type="checkbox" name="acceptTerms" /> Accept all terms & conditions
      </label>

      <button type="submit" className="register-btn">Register</button>

      <p className="login-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">Log in</Link>
      </p>
    </form>
  </div>
</div>
  );
};

export default Registration;
