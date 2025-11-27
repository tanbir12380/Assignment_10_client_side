import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const Registration = () => {
  const { createUser, updateUsersDetails, signInWithGoogle } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const checked = event.target.acceptTerms.checked;

    if (!passwordRegex.test(password)) {
      toast(
        " Password must be at least 6 characters long and include at least one uppercase and one lowercase letter"
      );
      return;
    }

    if (checked) {
      createUser(email, password)
        .then((respose) => {
          const user11 = respose.user;
          console.log("user is created, here is the details", respose.user);
          updateUsersDetails(user11, name, photo)
            .then((response1) => {
              console.log(
                "here is the result after updating profile",
                response1
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("error found", error.message);
          toast(error.message.slice(9));
        });
    } else {
      toast("Please accept terms and conditions");
    }
  };

  const signWithGoogle1 = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);

        toast(error.message.slice(9));
      });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleFormSubmit} className="register-form">
          <h2 className="register-title">Register</h2>

          <label>Name</label>
          <input type="text" name="name" placeholder="Enter name" required />

          <label>Picture</label>
          <input type="text" name="photo" placeholder="Photo URL" required />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <label className="terms">
            <input type="checkbox" name="acceptTerms" /> Accept all terms &
            conditions
          </label>

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>

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
        </form>
      </div>
    </div>
  );
};

export default Registration;
