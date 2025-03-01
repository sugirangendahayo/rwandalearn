/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="relative p-3 shadow-md">
      {/* Parent Navbar */}
      <div className="navbar bg-base-100 px-4 pt-4 py-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>News</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <span className="font-semibold text-[24px]">
            Kinya<span className="text-cyan-900">learn</span>
          </span>
        </div>
        <div className="navbar-start hidden lg:flex">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow " placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="navbar-end gap-4 ">
          <div className="hidden md:flex items-center justify-between gap-4 ">
            <div className="rounded-full p-2 bg-gray-100">
              <svg
                data-slot="icon"
                fill="none"
                className="h-6 w-6"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                ></path>
              </svg>
            </div>
            <div>
              <span className="text-gray-700 text-[12px]">Call center</span>
              <span className="font-semibold text-[17px] block">
                073-256-89-17
              </span>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
       
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Total: RWF 1000</span>
                <div className="card-actions">
                  <button className="btn bg-cyan-400 btn-block text-white">
                    <Link to="/store">View cart</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Link to="/login" className="btn bg-cyan-900 text-white rounded-[5px] border-none">
            Login
          </Link>
        </div>
      </div>

      {/* Child Navbar (Yellow Section) */}
      <div className="absolute top-[70%] left-[10%] w-[80%]  z-10 rounded-xl shadow-md bg-white">
        <div className="navbar-center hidden lg:flex justify-around">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
          
            <li>
              <Link>Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div>
            <span className="flex justify-center items-center gap-2 bg-cyan-900 text-white py-2 px-3 rounded-4xl">
              <span>
                <svg
                  data-slot="icon"
                  fill="none"
                  className="w-5 h-5"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  ></path>
                </svg>
              </span>
              <span>
                <Link>Daily offers</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
