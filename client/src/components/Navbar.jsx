import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Logo from "../assets/logo.jpg";
import { FaShoppingCart, FaChartLine } from "react-icons/fa"; // Importa el ícono de estadísticas

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHistory = () => {
    navigate("/history");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center"
          href="/"
          style={{ textDecoration: "none" }}
        >
          <img
            src={Logo}
            alt="Logo"
            className="rounded-circle me-2"
            style={{
              height: "100px",
              width: "100px",
              objectFit: "cover",
              border: "2px solid #007bff",
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#007bff",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Distri App
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Acerca de
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/product">
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-outline-primary me-2" href="/login">
                Iniciar Sesión
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary" href="/register">
                Registrarse
              </a>
            </li>
            {/* Ícono para estadísticas */}
            <li className="nav-item">
              <button
                className="btn btn-light position-relative"
                onClick={goToHistory}
                style={{ border: "none", background: "none" }}
              >
                <FaChartLine size={24} color="#007bff" />
              </button>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-light position-relative"
                onClick={goToCart}
                style={{ border: "none" }}
              >
                <FaShoppingCart size={24} color="#007bff" />
                {cart.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {cart.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
