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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
