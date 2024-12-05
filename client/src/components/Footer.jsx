import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container-sm d-flex justify-content-between align-items-start">
        <div>
          <p>&copy; 2024 Distri App. Todos los derechos reservados.</p>
          <ul className="list-unstyled">
            <li>
              <a
                href="#privacy-policy"
                className="text-decoration-none text-white"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="#terms-of-service"
                className="text-decoration-none text-white"
              >
                Términos de Servicio
              </a>
            </li>
            <li className="mt-3">
              <p className="mb-1">Contacto:</p>
              <p className="mb-0">
                <i className="fas fa-phone me-2"></i> +1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-map-marker-alt me-2"></i> Calle Ficticia
                123, Ciudad Imaginaria
              </p>
            </li>
          </ul>
        </div>

        <div className="text-end">
          <p>Síguenos en:</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
              >
                <i className="fab fa-facebook-f me-2"></i>
                Facebook
              </a>
            </li>
            <li className="list-inline-item mx-3">|</li>
            <li className="list-inline-item">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
              >
                <i className="fab fa-twitter me-2"></i>
                Twitter
              </a>
            </li>
            <li className="list-inline-item mx-3">|</li>
            <li className="list-inline-item">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white"
              >
                <i className="fab fa-instagram me-2"></i>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
