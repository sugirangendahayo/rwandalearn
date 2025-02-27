/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./layouts/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./ui/Home";
import NotFound from "./ui/NotFound";
import Login from "./Forms/Login";
import Register from "./Forms/Register";

const App = () => {
  const location = useLocation();
  const widePaths = ["/adminpage"];
  const isWidePath = widePaths.some((path) =>
    window.location.pathname.includes(path)
  );
  return (
    <>
      <div
        className={`m-auto overflow-hidden ${
          isWidePath ? "max-w-[1250px]" : "max-w-[1100px]"
        }`}
      >
        <header>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            !location.pathname.startsWith("/adminpage") && <Navbar />}
        </header>

        <main>
          <div className="mt-10">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>{" "}
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
