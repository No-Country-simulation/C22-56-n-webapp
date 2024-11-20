import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div>
        <div>
          <h1>MiLogo</h1>
        </div>
        <ul>
          <li>
            <a href="#home">Inicio</a>
          </li>
          <li>
            <a href="#about">Acerca de</a>
          </li>
          <li>
            <a href="#services">Servicios</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
          {/* Botón Login */}
          <li>
            <a href="/login">
              <button>Iniciar Sesión</button>
            </a>
          </li>
          {/* Botón Register */}
          <li>
            <a href="/register">
              <button>Registrarse</button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
