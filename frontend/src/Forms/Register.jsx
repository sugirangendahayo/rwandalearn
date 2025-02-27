/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axiosIntance";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phonenumber: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/register-user",
        formData
      );
      // Notify on success
      //   toast.success(response.data.message || "Registration successful!");

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "An error occurred during registration.";
      // Notify on error
      //   toast.error(errorMsg);
    }
  };

  return (
    <div className="h-screen grid justify-center items-center relative">
      <div className="absolute top-7 left-2">
        Or Go back to {"<-"}{" "}
        <NavLink to="/" className="text-cyan-500">
          Home page
        </NavLink>
      </div>
      <div className="mt-8 px-2">
        <form
          onSubmit={handleSubmit}
          className=" shadow-md w-pixel-basic-width2 rounded pb-2"
        >
          <div className="px-2">
            <div className="py-3 text-center">
              <h1 className="text-xl font-medium">Sign up</h1>
            </div>
            <div className="md:grid grid-cols-2">
              <div className="px-2 mb-2">
                <input
                  type="text"
                  placeholder="First name..."
                  onChange={handleInputChange}
                  value={formData.first_name}
                  name="first_name"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <input
                  type="text"
                  placeholder="Last name"
                  onChange={handleInputChange}
                  value={formData.last_name}
                  name="last_name"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <select className="w-full border-basic-border h-10 px-3 outline-none rounded-sm">
                  <option value="">Your nationnality</option>
                  <option value="">USA</option>
                  <option value="">CONGO</option>
                  <option value="">SUDAN</option>
                  <option value="">LIBERIA</option>
                </select>
              </div>
              <div className="px-2 mb-2">
                <input
                  type="text"
                  placeholder="Phone number"
                  onChange={handleInputChange}
                  value={formData.phonenumber}
                  name="phonenumber"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={formData.email}
                  name="email"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                  required
                />
              </div>
              <div className="px-2 mb-2">
                <input
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  name="password"
                  className="w-full border-basic-border h-10 px-3 outline-none rounded-sm"
                />
              </div>
              <div className="py-2 text-center  px-4 col-span-2 ">
                <span className="text-center">
                  Already have an account?{" "}
                  <NavLink className="text-blue-500" to="/login">
                    Login
                  </NavLink>{" "}
                </span>
              </div>
              <div className="px-2 mb-1 col-span-2">
                <button
                  className="text-white rounded w-full duration-300 px-2 py-2 mt-6 border-white bg-gradient-to-r from-blue-900 via-cyan-700 to-blue-400 hover:scale-105 cursor-pointer"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
