import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje:
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="form-control"
            placeholder="Escribe tu mensaje aquí"
            rows="5"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}

export default Contacto;
