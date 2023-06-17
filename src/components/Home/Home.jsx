import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Carousel from "react-bootstrap/Carousel";
import slide101 from "../../assets/slide101.png";
import slide102 from "../../assets/slide102.png";
import slide103 from "../../assets/slide103.png";
import slide201 from "../../assets/slide201.png";
import slide202 from "../../assets/slide202.png";
import slide203 from "../../assets/slide203.png";
import slide301 from "../../assets/slide301.png";
import slide302 from "../../assets/slide302.png";
import slide303 from "../../assets/slide303.png";
import logo from "../../assets/logo.png";
import "./Home.css";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = (loginType) => {
    if (loginType === "user") {
      navigate("/user-login");
    } else if (loginType === "seller") {
      navigate("/seller-login");
    }
  };

  const handleRegisterClick = (registerType) => {
    if (registerType === "user") {
      navigate("/user-register");
    } else if (registerType === "seller") {
      navigate("/seller-register");
    }
  };

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <Navbar bg="light" variant="light" expand="lg" fixed="top" className="navbar" style={{padding: '12px', marginBottom: "30px"}}>
        <Navbar.Brand onClick={() => navigate("/")}> <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />  Shopping Bag</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Select Your Portal" id="nav-dropdown">
              <NavDropdown.Item onClick={() => handleLoginClick("user")}>User Login</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleRegisterClick("user")}>User Registration</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLoginClick("seller")}>Sellers Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleRegisterClick("seller")}>Sellers Registration</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate("blog")}>Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* CAROUSEL */}
      <div className="carousel-container">
        <Carousel>
          {/* Slide 1 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide101} alt="First slide" />
            <Carousel.Caption>
              <h3>Your Ultimate Shopping Destination</h3>
              <p>
                Discover a world of endless possibilities at Shopping Bag. We offer a wide range of products, from trendy
                fashion to cutting-edge electronics, all in one convenient online store. Shop with confidence and find
                everything you need, right at your fingertips.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 2 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide102} alt="Second slide" />
            <Carousel.Caption>
              <h3>Your Ultimate Shopping Destination</h3>
              <p>
                Discover a world of endless possibilities at Shopping Bag. We offer a wide range of products, from trendy
                fashion to cutting-edge electronics, all in one convenient online store. Shop with confidence and find
                everything you need, right at your fingertips.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 3 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide103} alt="Third slide" />
            <Carousel.Caption>
              <h3>Your Ultimate Shopping Destination</h3>
              <p>
                Discover a world of endless possibilities at Shopping Bag. We offer a wide range of products, from trendy
                fashion to cutting-edge electronics, all in one convenient online store. Shop with confidence and find
                everything you need, right at your fingertips.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* CAROUSEL */}
      <div className="carousel-container">
        <Carousel>
          {/* Slide 1 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide201} alt="First slide" />
            <Carousel.Caption>
              <h3>Unleash the Shopper Within</h3>
              <p>
                At Shopping Bag, we empower you to embrace your inner shopper. Explore a vast collection of products,
                indulge in the joy of finding hidden gems, and satisfy your shopping cravings. With our user-friendly
                interface and extensive selection, let your shopping desires take flight.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 2 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide202} alt="Second slide" />
            <Carousel.Caption>
              <h3>Unleash the Shopper Within</h3>
              <p>
                At Shopping Bag, we empower you to embrace your inner shopper. Explore a vast collection of products,
                indulge in the joy of finding hidden gems, and satisfy your shopping cravings. With our user-friendly
                interface and extensive selection, let your shopping desires take flight.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 3 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide203} alt="Third slide" />
            <Carousel.Caption>
              <h3>Unleash the Shopper Within</h3>
              <p>
                At Shopping Bag, we empower you to embrace your inner shopper. Explore a vast collection of products,
                indulge in the joy of finding hidden gems, and satisfy your shopping cravings. With our user-friendly
                interface and extensive selection, let your shopping desires take flight.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* CAROUSEL */}
      <div className="carousel-container">
        <Carousel>
          {/* Slide 1 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide301} alt="First slide" />
            <Carousel.Caption>
              <h3>Where Style Meets Convenience</h3>
              <p>
                Shopping Bag is where style seamlessly merges with convenience. Discover the latest fashion trends,
                accessories, and home essentials, all carefully curated to elevate your lifestyle. With easy navigation and
                secure transactions, enjoy a hassle-free shopping experience tailored to your needs.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 2 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide302} alt="Second slide" />
            <Carousel.Caption>
              <h3>Where Style Meets Convenience</h3>
              <p>
                Shopping Bag is where style seamlessly merges with convenience. Discover the latest fashion trends,
                accessories, and home essentials, all carefully curated to elevate your lifestyle. With easy navigation and
                secure transactions, enjoy a hassle-free shopping experience tailored to your needs.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Slide 3 */}
          <Carousel.Item>
            <img className="d-block w-100" src={slide303} alt="Third slide" />
            <Carousel.Caption>
              <h3>Where Style Meets Convenience</h3>
              <p>
                Shopping Bag is where style seamlessly merges with convenience. Discover the latest fashion trends,
                accessories, and home essentials, all carefully curated to elevate your lifestyle. With easy navigation and
                secure transactions, enjoy a hassle-free shopping experience tailored to your needs.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
