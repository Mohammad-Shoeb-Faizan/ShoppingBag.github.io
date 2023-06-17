import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./NewProduct.css";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import SellerNavbar from "./SellerNavbar";
import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  "GQF8WC2F2X",
  "115a1814282e32663493824b90088810"
);
const index = algoliaClient.initIndex("STAR SHOPPER");

const NewProduct = () => {
  const [product, setProduct] = useState({
    title: "Your title here",
    description: "Your description here",
    price: "Price here",
    image: "https://picsum.photos/200/300",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const productRef = await addDoc(
          collection(db, "sellers", userId, "products"),
          product
        );
        const productId = productRef.id;
        await setDoc(
          doc(db, "sellers", userId),
          { [productId]: product },
          { merge: true }
        );

        console.log("Product added with ID: ", productId);

        index.saveObjects([product], { autoGenerateObjectIDIfNotExist: true });

        alert("Product published in the market!");

        setProduct({
          title: "Your title here",
          description: "Your description here",
          price: "Price here",
          image: "https://picsum.photos/200/300",
        });
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <SellerNavbar />
      <div className="new-product">
        <div className="new-product-form">
          <h2>New Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={product.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={product.image}
                onChange={handleInputChange}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </div>
        <div className="new-product-preview">
          <div className="block">
            <h1>
              <i>Live Preview:</i>
            </h1>
            <p>
              This is how your customers will see your product on the website.
            </p>
          </div>
          <div className="productImagePreview">
            <img
              id="previewImage"
              src={product.image}
              alt=""
              style={{ height: "350px" }}
            />
          </div>
          <div id="productTitlePreview">
            <h4>{product.title}</h4>
          </div>
          <div className="priceandDiscount flex">
            <h5 id="productPricePreview">₹{product.price}/-</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
