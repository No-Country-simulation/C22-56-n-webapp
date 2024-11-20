import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2024 MiEmpresa. Todos los derechos reservados.</p>
        <ul>
          <li>
            <a href="#privacy-policy">Política de Privacidad</a>
          </li>
          <li>
            <a href="#terms-of-service">Términos de Servicio</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>
        <div>
          <p>Síguenos en:</p>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
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
