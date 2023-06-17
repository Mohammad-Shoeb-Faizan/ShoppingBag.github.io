import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Cart.css";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import GooglePayButtonComponent from "./GooglePayButton";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const updateCartItemQuantity = (productId, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    alert("Product removed from cart!");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    alert("Cart cleared!");
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return <p>Your cart is empty.</p>;
    }

    return (
      <>
        {cartItems.map((item) => (
          <Card className="cart-item-card" key={item.id}>
            <Row>
              <Col sm={3}>
                <Card.Img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-img"
                />
              </Col>
              <Col sm={6}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <div className="quantity-control">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <span className="quantity">{item.quantity}</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Col>
              <Col sm={3}>
                <Card.Text className="item-total">
                  Total: ${item.price * item.quantity}
                </Card.Text>
              </Col>
            </Row>
          </Card>
        ))}
        <div className="cart-summary">
          <GooglePayButtonComponent cartTotal={calculateTotal()} />
          <p className="total">Total: ${calculateTotal()}</p>
          <Button
            variant="primary"
            className="checkout-button"
            onClick={() => {
              navigate("/ordered");
              localStorage.clear();
            }}
          >
            Checkout
          </Button>
        </div>
        <Button
          variant="secondary"
          className="cart-clear-button"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </>
    );
  };

  return (
    <div className="container">
      <UserNavbar />
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items-container">{renderCartItems()}</div>
    </div>
  );
};

export default Cart;
