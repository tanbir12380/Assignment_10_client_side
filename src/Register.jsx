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
    <div
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      style={{
        width: "100% !important",
        padding: "80px 0px",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "600px",
          margin: "10px auto",
        }}
        className="card-body"
      >
        <form
          onSubmit={handleFormSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid rgba(59, 88, 194, 1)",
            padding: "30px",
            gap: "10px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "40px",
              fontFamily: "sans-serif",
            }}
          >
            Register
          </h2>
          <label className="label">Name</label>
          <input
            style={{
              width: "100%",
            }}
            type="text"
            name="name"
            className="input"
            placeholder="name"
          />
          <label className="label">Picture</label>
          <input
            style={{
              width: "100%",
            }}
            type="text"
            name="picture"
            className="input"
            placeholder="PhotoURL"
          />
          <label className="label">Email</label>
          <input
            style={{
              width: "100%",
            }}
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <div
            style={{
              width: "100%",
            }}
            className="relative flex items-center bg-white/20 backdrop-blur-sm rounded-md px-3 py-2"
          >
            <input
              style={{
                width: "100%",
              }}
              name="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1 text-white placeholder-white/70"
            />
          </div>

          <label className="label">
            <input type="checkbox" name="accpetTerms" className="checkbox" />
            Accept all terms and conditions
          </label>
          <button
            type="submit"
            style={{
              width: "100%",
            }}
            className="btn btn-neutral mt-4"
          >
            Register
          </button>
          <div>
            <p>
              Already have an account ?{" "}
              <Link
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
                to="/login"
              >
                Log in{" "}
              </Link>
            </p>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
