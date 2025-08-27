import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import IsLogin from "./pages/auth/IsLogin";

function App() {
  const [isServerReady, setIsServerReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [minLoadingTime, setMinLoadingTime] = useState(false);

  useEffect(() => {
    // Set minimum loading time of 2 seconds
    const minTimer = setTimeout(() => {
      setMinLoadingTime(true);
    }, 2000);

    const checkServerHealth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_SOCKET_URL}/ok`,
          {
            method: "GET",
            timeout: 10000, // 10 second timeout
          }
        );

        if (response.ok) {
          setIsServerReady(true);
        }
      } catch (error) {
        console.log("Server warming up...");
        // Retry after 2 seconds
        setTimeout(checkServerHealth, 2000);
        return;
      }
    };

    checkServerHealth();

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    // Only stop loading when both server is ready AND minimum time has passed
    if (isServerReady && minLoadingTime) {
      setIsLoading(false);
    }
  }, [isServerReady, minLoadingTime]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          backgroundColor: "#AB78EB",
        }}
      >
        <HashLoader color="#6E09ED" size={100} />
        <p style={{ marginTop: "20px", color: "#6E09ED", fontSize: "30px" }}>
          Loading ...
        </p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<IsLogin />}>
          <Route path="/" element={<DashBoard />} />
        </Route>
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/signup" element={<Auth type="signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
