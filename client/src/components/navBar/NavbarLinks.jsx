import React from "react";

const NavbarLinks = () => {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item me-3">
        <a className="nav-link" href="/">
          Inicio
        </a>
      </li>
      <li className="nav-item me-3">
        <a className="nav-link" href="/about">
          Acerca de
        </a>
      </li>
      <li className="nav-item me-3">
        <a className="nav-link" href="/product">
          Productos
        </a>
      </li>
    </ul>
  );
};

export default NavbarLinks;
