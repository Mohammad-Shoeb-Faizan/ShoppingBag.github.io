import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UserLogin.css";
import image from "../../assets/UserLogin.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function UserLogin() {
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const email = event.target.elements.formBasicEmail.value;
    const password = event.target.elements.formBasicPassword.value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(query(usersRef, where("uid", "==", user.uid)));
  
      if (querySnapshot.empty) {
        console.log("User does not exist in the 'users' collection");
      } else {
        console.log("Login successful:", user);
        navigate('/shop');
      }
    } catch (error) {
      console.log("Login failed:", error);
      alert("Please Enter Valid Details!");
    }
  };
  
  return (
    <div className="user-login">
      <div className="user-login-image">
        <img src={image} alt="Login Image" onClick={() => navigate("/")} />
      </div>
      <div className="user-login-form">
        <h2>User Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UserLogin;
