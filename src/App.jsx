import React from "react";
import { useEffect, useState } from "react";
import Product from "./Product";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import ProfilePage from "./pages/profilePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userAuth" element={<UserAuth />} />
        <Route path="/profilePage" element={<ProfilePage />} />
      </Routes>
    </>
  );
}
