import React from "react";
import { useNavigate } from "react-router-dom";
import "./SellerNavbar.css";
import logo from "../../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const SellerNavbar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-left">
        <button className="user-navbar-logo" onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="Logo" />
        </button>
        <h2 className="user-navbar-title">Shopping Bag</h2>
      </div>
      <div className="user-navbar-right">
        <button className="user-navbar-link" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
        <button className="user-navbar-link" onClick={() => navigate("/new-product")}>
          New Product
        </button>
        <button className="user-navbar-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SellerNavbar;
