import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from "./component/Layout/Layout";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import NotFound from "./component/NotFound/NotFound";

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        if (res.status == 200) {
          setLogin(true);
        } else {
          setLogin(false);
          navigate("/login");
        }
      });
  }, [login]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route
          path="/:page"
          element={<Layout login={login} setLogin={setLogin} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
