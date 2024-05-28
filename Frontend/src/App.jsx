import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import GetAllUsers from "./pages/GetAllUsers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SecPage from "./pages/SecPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login authenticate={authenticate} />} />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/dashboard" element={<Dashboard logout={logout} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/secpage" element={<SecPage />} />
          <Route path="/allusers" element={<GetAllUsers />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
