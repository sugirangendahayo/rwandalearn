/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useState } from "react";
import Loading from "../utils/Loading";
import { UserContext } from "../context/HookContext";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

const DashboardCharts = () => {
  const { loading, theme, error, timeSpent, scores } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const levelMap = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  const dailyAttendance = Math.min(
    (timeSpent / (24 * 60 * 60)) * 100,
    100
  ).toFixed(2);

  const highestPassedLevel = scores
    .filter((s) => s.score >= 7)
    .reduce((max, s) => {
      const levelNum =
        s.level === "Beginner" ? 1 : s.level === "Intermediate" ? 2 : 3;
      return Math.max(max, levelNum);
    }, 0);
  const currentLevel = highestPassedLevel + 1 > 3 ? 3 : highestPassedLevel + 1;
  const currentLevelProgress = ((currentLevel - 1) / 3) * 100;
// isTestButtonDisabled
  // Find the most recent score for the current level
  const currentLevelScore = scores
    .filter((s) => s.level === levelMap[currentLevel])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]; // Assuming scores have a created_at field
  const recentScorePercentage = currentLevelScore
    ? (currentLevelScore.score / 10) * 100
    : 0;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="col-span-2 px-4 md:px-2 py-2">
        <div className="grid sm:grid-cols-2 justify-between items-center gap-2">
          <span className="text-[18px] font-medium col-span-2 md:col-span-1 md:text-center">
            Summary Support
          </span>
          <span className="col-span-2 md:col-span-1">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
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
          </span>
          <div
            className={`col-span-2 grid grid-cols-2 m-3 p-2 gap-4 justify-between shadow ${
              theme === "sunset" ? "shadow-teal-950" : ""
            } rounded`}
          >
            <div className="text-center">
              <span>Daily Attendance</span>
              <div>
                <span>
                  <div
                    className="radial-progress text-blue-500"
                    style={{ "--value": dailyAttendance }}
                    role="progressbar"
                  >
                    {dailyAttendance}%
                  </div>
                </span>
                <p className="text-[13px] py-2">
                  Time spent today: {Math.floor(timeSpent / 3600)}h{" "}
                  {Math.floor((timeSpent % 3600) / 60)}m
                </p>
              </div>
            </div>
            <div className="text-center">
              <span>Current Level</span>
              <div>
                <span>
                  <div
                    className="radial-progress text-orange-400"
                    style={{ "--value": currentLevelProgress }}
                    role="progressbar"
                  >
                    {currentLevel}/3
                  </div>
                </span>
                <p className="text-[13px] py-2">
                  {levelMap[currentLevel] || "Not started"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1">
        <div className="px-1 text-center">
          <h1 className="text-xl font-medium p-2">My Calendar</h1>
          <Calendar
            onChange={setDate}
            value={date}
            className="react-calendar shadow-md w-full"
            data-theme="sunset"
          />
          <p className="pt-2">Selected Date: {date.toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
