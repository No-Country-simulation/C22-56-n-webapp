import React from "react";
import { FaShoppingCart, FaChartLine } from "react-icons/fa";
import CartBadge from "./CartBadge";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavbarActions = ({
  goToCart,
  goToHistory,
  cart,
  setShowLoginModal,
  setShowRegisterModal,
  setShowContactModal,
}) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (user) {
      setUser(null);
      localStorage.removeItem("user");
    } else {
      setShowLoginModal(true);
    }
  };

  const goToClients = () => {
    navigate("/clientes");
  };

  const goToHistoryPage = () => {
    navigate("/history");
  };

  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item me-3">
        <button
          className={`btn ${user ? "btn-danger" : "btn-outline-primary"} me-2`}
          onClick={handleLoginLogout}
        >
          {user ? "Cerrar Sesión" : "Iniciar Sesión"}
        </button>
      </li>
      {!user && (
        <li className="nav-item me-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowRegisterModal(true)}
          >
            Registrarse
          </button>
        </li>
      )}
      <li className="nav-item me-3">
        <button
          className="btn btn-secondary"
          onClick={() => setShowContactModal(true)}
        >
          Contacto
        </button>
      </li>

      {/* Mostrar solo si el usuario está logueado y es admin */}
      {user && user.role === "admin" && (
        <>
          <li className="nav-item me-3">
            <button className="btn btn-info" onClick={goToClients}>
              Clientes
            </button>
          </li>
          <li className="nav-item me-3">
            <button
              className="btn btn-light position-relative"
              onClick={goToHistoryPage}
              style={{ border: "none", background: "none" }}
            >
              <FaChartLine size={24} color="#007bff" />
            </button>
          </li>
        </>
      )}

      {user && (
        <li className="nav-item me-3">
          <button
            className="btn btn-light position-relative"
            onClick={goToCart}
            style={{ border: "none" }}
          >
            <FaShoppingCart size={24} color="#007bff" />
            <CartBadge cart={cart} />
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavbarActions;
