import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SellerRegistration.css";
import image from "../../assets/SellerRegistration.png";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

function SellerRegistration() {
  let navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    const name = event.target.elements.formBasicName.value;
    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await addDoc(collection(db, "sellers"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });

      console.log("Registration successful:", user);
      navigate('seller-login')
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className="seller-registration">
      <div className="seller-registration-image">
        <img
          src={image}
          alt="Registration Image"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="seller-registration-form">
        <h2>Seller Registration</h2>
        <Form onSubmit={handleRegistration}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SellerRegistration;
