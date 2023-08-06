import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Layout/Login";
import Signup from "./Components/Layout/Signup";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { LoadUserAction } from "./Actions/UserAction";
import ProtectedRoute from "./Middleware/ProtectedRoute";
import PublicRoute from "./Middleware/PublicRoute";
import Home from "./Components/Layout/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUserAction());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>page not foound</div>} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
