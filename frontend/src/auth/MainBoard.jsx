/* eslint-disable no-unused-vars */
// kinyalearn/frontend/src/components/MainBoard.jsx
import React, { useContext } from "react";
import TopNav from "../layouts/TopNav";
import DashboardCharts from "../charts/DashboardCharts";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../context/HookContext";
import UserNav from "../layouts/UserNav";
import LevelsPage from "./LevelsPage";
import AiAssistance from "./AiAssistance";

const MainBoard = () => {
  const { theme, auth, loading, error } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section
      className="shadow-md md:p-2 md:rounded-md m-auto"
      data-theme={theme}
    >
      <TopNav />
      <div className="dashboard grid grid-cols-9 relative">
        <UserNav />
        <div
          className="shadow-inner md:p-2 rounded col-span-9 md:col-span-7 md:m-2"
          data-theme={theme}
        >
          <Routes>
            <Route path="/" element={<DashboardCharts />} /> {/* Unprotected */}
            <Route
              path="/lesson/:levelId"
              element={auth ? <LevelsPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/ai"
              element={auth ? <AiAssistance /> : <Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default MainBoard;
