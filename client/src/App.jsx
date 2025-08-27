import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import DashBoard from "./pages/dashboard/DashBoard";
import IsLogin from "./pages/auth/IsLogin";

function App() {
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
