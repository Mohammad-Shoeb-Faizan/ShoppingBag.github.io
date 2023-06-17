import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./CheckedOut.css";
import { useNavigate } from "react-router-dom";

const CheckedOut = () => {
    let navigate = useNavigate();
  return (
    <div className="checked-out">
      <Container>
        <Row>
          <Col>
            <h2>Your Order is Booked!</h2>
            <p>You'll receive further details on your registered number and email.</p>
            <Button onClick={()=> navigate('/shop')}>GO BACK TO SHOP!</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckedOut;
