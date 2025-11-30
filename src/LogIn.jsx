import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const LogIn = () => {
  const { SignInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    SignInUser(email, password)
      .then((respose) => {
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast(error.message.slice(9));
      });
  };

  const signWithGoogle1 = () => {
    signInWithGoogle().then((result) => {
      navigate(location.state || "/");
    });
  };

  console.log(location);

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSignIn} className="register-form">
          <h2 className="register-title">Login</h2>

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />

          <a className="login-link" style={{ fontSize: "14px" }}>
            Forgot password?
          </a>

          <button className="register-btn" type="submit">
            Login
          </button>

          <p className="login-text">
            New to our website?{" "}
            <Link className="login-link" to="/register">
              Register
            </Link>
          </p>
        </form>

        <button
          onClick={signWithGoogle1}
          className="register-btn"
          style={{
            background: "white",
            color: "black",
            border: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "10px",
            width: "100%",
            boxShadow: "2px 2px 5px rgba(30, 30, 30, 0.25)",
          }}
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <g>
              <path fill="#fff" d="m0 0H512V512H0"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LogIn;
