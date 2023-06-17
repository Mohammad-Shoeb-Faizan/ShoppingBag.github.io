import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SellerLogin.css";
import image from "../../assets/SellerLogin.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function SellerLogin() {
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const usersRef = collection(db, "sellers");
      const querySnapshot = await getDocs(
        query(usersRef, where("uid", "==", user.uid))
      );

      if (querySnapshot.empty) {
        console.log("User does not exist in the 'sellers' collection");
      } else {
        console.log("Login successful:", user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login failed:", error);
      alert("Please Enter Valid Details!");
    }
  };

  return (
    <div className="seller-login">
      <div className="seller-login-image">
        <img src={image} alt="Seller Image" onClick={() => navigate("/")} />
      </div>
      <div className="seller-login-form">
        <h2>Seller Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicCompany">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Enter company name" />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label>Company Address</Form.Label>
            <Form.Control type="text" placeholder="Enter company address" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SellerLogin;
