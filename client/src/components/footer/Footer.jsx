import React from "react";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSocialLinks from "./FooterSocialLinks";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container-sm d-flex justify-content-between align-items-start">
        <div>
          <p>&copy; 2024 Distri App. Todos los derechos reservados.</p>
          <FooterLinks />
          <div className="mt-3">
            <FooterContact />
          </div>
        </div>

        <div className="text-end">
          <p>Síguenos en:</p>
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
