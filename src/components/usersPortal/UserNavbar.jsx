import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import logo from "../../assets/logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const UserNavbar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/User-login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="user-navbar">
      <div className="user-navbar-left">
        <button className="user-navbar-logo" onClick={() => navigate("/shop")}>
          <img src={logo} alt="Logo" />
        </button>
        <h2 className="user-navbar-title">Shopping Bag</h2>
      </div>
      <div className="user-navbar-right">
        <button className="user-navbar-link" onClick={() => navigate("/shop")}>
          Shop
        </button>
        <button className="user-navbar-link" onClick={() => navigate("/cart")}>
          Cart
        </button>
        <button className="user-navbar-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
