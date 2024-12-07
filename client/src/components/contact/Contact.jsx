import React, { useState } from "react";
import ContactoField from "./ContactoField";
import ContactoButton from "./ContactoButton";

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por contactarnos!");
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div>
      <h2 className="text-center mb-4">Contáctanos</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <ContactoField
          label="Nombre:"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          required
        />
        <ContactoField
          label="Correo electrónico:"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico"
          type="email"
          required
        />
        <ContactoField
          label="Mensaje:"
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí"
          type="textarea"
          rows="5"
          required
        />
        <ContactoButton text="Enviar mensaje" />
      </form>
    </div>
  );
}

export default Contacto;
