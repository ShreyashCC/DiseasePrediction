import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, db } from "./components/firebase";
import { doc, getDoc } from "firebase/firestore";

import Login from "./components/login";
import SignUp from "./components/signUp";
import Dashboard from "./components/dashboard";
import ImageUpload from "./components/imageUpload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/predict/:disease" element={user ? <ImageUpload /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
