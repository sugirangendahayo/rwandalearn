/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../context/HookContext";
import axiosInstance from "../axiosIntance";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { setAuth, setUserDetails, fetchUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", values);

      if (res.status === 200) {
        const { message, role, token, user } = res.data;

        // Store token and set axios header
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        // Update context
        setAuth(true);
        setUserDetails(user);

        // Refetch user data to ensure scores and details are loaded
        await fetchUserData();

        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
        });

        // Navigate based on role
        switch (role) {
          case "user":
            navigate("/dashboard");
            break;
          default:
            navigate("/22");
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.Error || "An error occurred during login";
      setErrorLogin(errorMessage);
    }
  };

  return (
    <div className="md:h-screen md:grid justify-center items-center relative">
      <div className="absolute top-7 left-2">
        Or Go back to {"<-"}{" "}
        <NavLink to="/" className="text-cyan-500">
          Home page
        </NavLink>
      </div>
      <div className="mt-8 px-2 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="shadow-md w-pixel-basic-width2 rounded pb-2"
        >
          <div className="px-2">
            <div className="py-3 text-center">
              <h1 className="text-xl font-medium">Login</h1>
              {errorLogin && (
                <div className="bg-red-200 w-frame-width rounded m-auto mt-2 p-2">
                  <h1>{errorLogin}</h1>
                </div>
              )}
            </div>
            <div className="px-2 mb-2">
              <input
                type="email"
                placeholder="Email..."
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
              />
            </div>
            <div className="px-2 mb-2">
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
              />
            </div>
            <div className="px-2 mb-1">
              <button
                className="text-white rounded w-full duration-300 px-2 py-2 mt-6 border-white bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-400 hover:scale-105 cursor-pointer"
                type="submit"
              >
                Sign in
              </button>
            </div>
            <div className="py-2 text-center md:text-left md:grid grid-cols-2 px-4">
              <span>
                <NavLink to="/forgot-password">Forgot password?</NavLink>
              </span>
              <span>
                Not yet registered?{" "}
                <NavLink className="text-blue-500" to="/register">
                  Signup
                </NavLink>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
