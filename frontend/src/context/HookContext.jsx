/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosIntance";


export const UserContext = createContext(null);

const HookContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(
    () => localStorage.getItem("auth") === "true"
  );
  const [userDetails, setUserDetails] = useState(null);
  const [scores, setScores] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved from localStorage:", token);

      if (!token) {
        setError("No authentication token found");
        setAuth(false);
        localStorage.setItem("auth", "false");
        return;
      }

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      console.log("Fetching user data...");
      const userResponse = await axiosInstance.get("/users");
      console.log("User data response:", userResponse.data);
      setUserDetails(userResponse.data.results);

      console.log("Fetching scores...");
      const scoresResponse = await axiosInstance.get("/scores");
      console.log("Scores response:", scoresResponse.data);
      setScores(scoresResponse.data.results || []);

      setAuth(true);
      localStorage.setItem("auth", "true");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        `Error: ${err.response?.data?.error || err.message || "Unknown error"}`
      );
      setAuth(false);
      localStorage.setItem("auth", "false");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch data if authenticated or token exists
    if (auth || localStorage.getItem("token")) {
      fetchUserData();
    } else {
      setLoading(false); // Avoid infinite loading if no token
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent((prev) => Math.min(prev + 1, 24 * 60 * 60));
    }, 1000);

    return () => clearInterval(interval);
  }, [auth]); // Depend on auth to re-fetch after login

  const contextData = {
    theme,
    setTheme,
    open,
    setOpen,
    loading,
    setLoading,
    error,
    setError,
    auth,
    setAuth,
    userDetails,
    setUserDetails,
    scores,
    setScores,
    timeSpent,
    setTimeSpent,
    fetchUserData, // Exposed for manual calls if needed
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default HookContextProvider;
