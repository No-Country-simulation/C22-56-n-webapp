import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState(""); // Nuevo estado para ciudad
  const [address, setAddress] = useState(""); // Nuevo estado para domicilio
  const [dni, setDni] = useState(""); // Nuevo estado para DNI
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      city === "" ||
      address === "" ||
      dni === ""
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
      console.log("Registrando...", email, password, city, address, dni);
    }
  };

  // Lista de departamentos de Mendoza
  const departments = [
    "Capital",
    "Godoy Cruz",
    "Maipú",
    "Luján de Cuyo",
    "San Martín",
    "Lavalle",
    "Tupungato",
    "Rivadavia",
    "General Alvear",
    "San Rafael",
    "Malargüe",
    "Junín",
    "Guaymallén",
    "Las Heras",
    "La Paz",
  ];

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center mb-4">Registro</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  Ciudad:
                </label>
                <select
                  id="city"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="">Selecciona un departamento</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Domicilio:
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">
                  DNI:
                </label>
                <input
                  type="text"
                  id="dni"
                  className="form-control"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
