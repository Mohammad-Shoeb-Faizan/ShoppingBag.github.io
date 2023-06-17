import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UserLogin from "./components/login/UserLogin";
import SellerLogin from "./components/login/SellerLogin";
import UserRegistration from "./components/register/UserRegistration";
import SellerRegistration from "./components/register/SellerRegistration";
import Blog from "./components/blog/Blog";
import UsersHomePage from "./components/usersPortal/UsersHomePage";
import Cart from "./components/usersPortal/Cart";
import CheckedOut from "./components/usersPortal/CheckedOut";
import SellersHomePage from "./components/sellersPortal/SellersHomePage";
import NewProduct from "./components/sellersPortal/NewProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="User-login" element={<UserLogin />} />
        <Route path="/shop" element={<UsersHomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordered" element={<CheckedOut />} />
        <Route path="seller-login" element={<SellerLogin />} />
        <Route path="/dashboard" element={<SellersHomePage />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="user-register" element={<UserRegistration />} />
        <Route path="seller-register" element={<SellerRegistration />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
