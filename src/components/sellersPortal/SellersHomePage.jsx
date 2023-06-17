import React, { useEffect, useRef, useState } from "react";
import "./SellersHomePage.css";
import SellerNavbar from "./SellerNavbar";
import { Chart, registerables } from "chart.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import algoliasearch from "algoliasearch";
import { Modal, Button } from "react-bootstrap";

const algoliaClient = algoliasearch(
  "GQF8WC2F2X",
  "115a1814282e32663493824b90088810"
);
const index = algoliaClient.initIndex("STAR SHOPPER");

Chart.register(...registerables);

const SellersHomePage = () => {
  const chartRef = useRef(null);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;

          const q = query(collection(db, "sellers", userId, "products"));
          const querySnapshot = await getDocs(q);

          const products = [];
          querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
          });

          setUserProducts(products);
        }
      } catch (error) {
        console.error("Error fetching user products: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My Sales Analytics",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chart = new Chart(chartRef.current, config);

    return () => {
      chart.destroy();
    };
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      );
      if (confirmed) {
        await index.deleteObject(productId);

        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const productRef = doc(db, "sellers", userId, "products", productId);
          await deleteDoc(productRef);

          setUserProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditedTitle(product.title);
    setEditedDescription(product.description);
    setEditedPrice(product.price);
  };

  const handleUpdateProduct = async () => {
    try {
      const user = auth.currentUser;
      if (user && selectedProduct) {
        const userId = user.uid;
        const productRef = doc(
          db,
          "sellers",
          userId,
          "products",
          selectedProduct.id
        );

        await updateDoc(productRef, {
          title: editedTitle,
          description: editedDescription,
          price: editedPrice,
        });

        const updatedProduct = {
          ...selectedProduct,
          objectID: selectedProduct.id,
          title: editedTitle,
          description: editedDescription,
          price: editedPrice,
        };
        await index.saveObject(updatedProduct);

        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <>
      <SellerNavbar />
      <div className="sellers-home-page">
        <div className="left-column">
          <canvas ref={chartRef} />
        </div>
        <div className="right-column">
          <h1>Your Products in sale</h1>
          <div className="product-cards">
            {userProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt=""
                  className="product-card-image"
                />
                <div className="product-card-details">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <Modal
          show={selectedProduct !== null}
          onHide={() => setSelectedProduct(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="editedTitle">Title:</label>
              <input
                type="text"
                className="form-control"
                id="editedTitle"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedDescription">Description:</label>
              <input
                type="text"
                className="form-control"
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedPrice">Price:</label>
              <input
                type="text"
                className="form-control"
                id="editedPrice"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUpdateProduct}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SellersHomePage;
