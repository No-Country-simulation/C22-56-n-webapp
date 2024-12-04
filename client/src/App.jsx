import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Product from "./components/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/abouts";
import Detail from "./components/ProdcutDetails";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "http://localhost:5000/api/";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:productId" element={<Detail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
