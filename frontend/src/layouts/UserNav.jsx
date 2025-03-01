/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/HookContext";
import axiosInstance from "../axiosIntance";
import ai_robot from "../assets/images/robot.png";

const UserNav = () => {
  const { open } = useContext(UserContext);
  const [level, setLevel] = useState([]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const getYear = await axiosInstance.get("/level");
        setLevel(getYear.data.degrees);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };
    fetchUnreadCount();
  }, []);

  return (
    <div
      className={`aside md:col-span-2 fixed md:static top-0 left-0 h-screen md:h-auto bg-base-200 rounded-box shadow-md transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <ul className="menu bg-base-200">
        <li>
          <span>
            <a className="tooltip tooltip-right" data-tip="Home">
              <svg
                className="h-5 w-5"
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
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                ></path>
              </svg>
            </a>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </span>
        </li>
      </ul>
      <ul className="menu bg-base-200">
        <li>
          <span>
            <span className="tooltip tooltip-right" data-tip="Levels">
              <svg
                className="h-5 w-5"
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
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                ></path>
              </svg>
            </span>
            <span>Levels</span>
          </span>
          {level.map((value) => (
            <ul className="menu-dropdown menu-dropdown-show" key={value.id}>
              <li>
                <Link to={`/dashboard/lesson/${value.id}`}>{value.name}</Link>
              </li>
            </ul>
          ))}
        </li>
      </ul>
      <ul className="menu">
        <li>
          <span className="flex justify-between items-center">
            <span className="tooltip tooltip-right" data-tip="Ai assistant">
              <img src={ai_robot} alt="" className="h-5 w-5" />
            </span>
            <span>
              <Link to="/dashboard/ai">Ai Assistant</Link>
            </span>
          </span>
        </li>
        <li>
          <span>
            <a className="tooltip tooltip-right" data-tip="FAQs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
            <a href="">FAQs</a>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
