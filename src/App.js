import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ProfileScreen from "./screens/ProfileScreen";
import Register from "./Register";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<HomeScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
