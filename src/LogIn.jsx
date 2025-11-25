import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

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
        console.log("user is logged in, here is the details", respose.user);
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log("error found", error.message);
      });
  };

  const signWithGoogle1 = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-sm border border-white/20">
        <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-wide">
          Login Now
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-white/80 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white/80 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="flex justify-start">
            <a className="text-white/60 hover:text-white transition underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button className="w-full btn btn-neutral mt-2">Login</button>
          <p className="text-white/60 hover:text-white transition cursor-pointer">
            New to our website ?{" "}
            <Link
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
              to="/registration"
            >
              Register
            </Link>{" "}
          </p>
        </form>
        <button
          onClick={signWithGoogle1}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
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
