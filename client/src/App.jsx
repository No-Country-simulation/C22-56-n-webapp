import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import ProductList from "./components/productList/ProductList";
import Navbar from "./components/navBar/Navbar";
import Footer from "./components/footer/Footer";
import About from "./components/abouts/Abouts";
import ProductDetails from "./components/productDetails/ProductDetails";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import History from "./components/orderHistory/OrderHistory";
import Cart from "./components/cart/Cart";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

axios.defaults.baseURL = "http://localhost:5432/api/";

const App = () => {
  return (
    <CartProvider>
      <ProductsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList />} />{" "}
            <Route path="/about" element={<About />} />
            <Route path="/detail/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Footer />
        </Router>
      </ProductsProvider>
    </CartProvider>
  );
};

export default App;
