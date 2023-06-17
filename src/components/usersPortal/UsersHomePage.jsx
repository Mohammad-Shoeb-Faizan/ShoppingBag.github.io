import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, connectHits } from "react-instantsearch-dom";
import { Row, Col } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./UsersHomePage.css";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";

const algoliaClient = algoliasearch(
  "GQF8WC2F2X",
  "a1ef18706b77edbfae941fe9c3e9b473"
);
const index = algoliaClient.initIndex("STAR SHOPPER");

const UsersHomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (searchQuery, minPrice, maxPrice) => {
    const filters = [];

    if (minPrice) {
      filters.push(`price >= ${minPrice}`);
    }
    if (maxPrice) {
      filters.push(`price <= ${maxPrice}`);
    }

    index
      .search(searchQuery, {
        filters: filters.join(" AND "),
        hitsPerPage: 20,
      })
      .then((response) => {
        setFilteredData(response.hits);
      })
      .catch((error) => {
        console.error("Error fetching products from Algolia:", error);
      });
  };

  const sortProducts = (sortBy) => {
    let sortedProducts = [...filteredData];
    switch (sortBy) {
      case "price":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "discount":
        sortedProducts.sort((a, b) => b.discount - a.discount);
        break;
      case "a-z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setFilteredData(sortedProducts);
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    alert("Product added to cart!");
  };

  const Hit = ({ hit }) => {
    return (
      <CSSTransition classNames="fade" timeout={300}>
        <div className="hit-item">
          <div className="hit-item-img">
            <img src={hit.image} alt={hit.title} />
          </div>
          <div className="hit-item-title">
            <h6>{hit.title}</h6>
            <p>{hit.description}</p>
            <div className="hit-item-price-div">
              <h4>Price: ${hit.price}</h4>
              <button
                className="home-page-button-two"
                onClick={() => addToCart(hit)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  };

  return (
    <div className="container">
      <UserNavbar />
      <Row>
        <Col
          sm={4}
          className="filter-col"
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <div className="filter-bar" style={{ marginBottom: "20px" }}>
            <div className="filter-group">
              <label style={{ marginBottom: "10px", display: "block" }}>
                Filter by Price:
              </label>
              <input
                type="number"
                placeholder="Min"
                id="minPrice"
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <br />
              <input
                type="number"
                placeholder="Max"
                id="maxPrice"
                style={{
                  marginBottom: "10px",
                  padding: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <br />
              <button
                className="home-page-button"
                onClick={() => {
                  const minPrice = parseInt(
                    document.getElementById("minPrice").value
                  );
                  const maxPrice = parseInt(
                    document.getElementById("maxPrice").value
                  );
                  filterProducts("", minPrice, maxPrice);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="sort-bar">
            <label style={{ display: "block" }}>Sort By:</label>
            <select
              className="sort-select"
              onChange={(e) => {
                const sortBy = e.target.value;
                sortProducts(sortBy);
              }}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            >
              <option value="">None</option>
              <option value="price">Price (Low to High)</option>
              <option value="discount">Discount</option>
              <option value="a-z">Name (A to Z)</option>
              <option value="z-a">Name (Z to A)</option>
            </select>
          </div>
        </Col>

        <Col sm={8} className="hits-col">
          <InstantSearch indexName="STAR SHOPPER" searchClient={algoliaClient}>
            <SearchBox
              onChange={(event) => {
                const searchQuery = event.currentTarget.value;
                filterProducts(searchQuery);
              }}
            />

            <TransitionGroup className="hits-container">
              {filteredData.map((hit) => (
                <Hit key={hit.objectID} hit={hit} />
              ))}
            </TransitionGroup>
          </InstantSearch>
        </Col>
      </Row>
    </div>
  );
};

export default UsersHomePage;