/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { UserContext } from "../context/HookContext";
import user from "../assets/images/aibot.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosIntance";

const TopNav = () => {
  const { open, setOpen, theme, setTheme, setAuth, setUserDetails, setScores } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await axiosInstance.post("/auth/logout");
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      // Reset UserContext
      setAuth(false);
      setUserDetails(null);
      setScores([]);
      // Redirect to home or login page
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex items-center justify-between px-2 m-2">
      <h1>Logo</h1>
      <div className="flex items-center gap-2 px-1">
        <div
          className={`${
            theme === "light" ? "bg-gray-800 text-white" : "bg-white text-black"
          } p-1 rounded-full cursor-pointer`}
          onClick={changeTheme}
        >
          {theme === "light" ? (
            <svg
              className="w-6"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              ></path>
            </svg>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src={user} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">Edit</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        <div
          className={`block md:hidden cursor-pointer bg-gray-50 p-[6px] rounded shadow-inner`}
          onClick={handleClick}
        >
          {open ? (
            <svg
              className="w-6"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
