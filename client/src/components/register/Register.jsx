import React, { useState } from "react";
import FormInput from "./FormInput"; // Importar el componente FormInput
import FormSelect from "./FormSelect"; // Importar el componente FormSelect
import ErrorMessage from "./ErrorMessage"; // Importar el componente ErrorMessage

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
              <FormInput
                id="email"
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                id="password"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                id="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FormSelect
                id="city"
                label="Ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                options={departments}
                required
              />
              <FormInput
                id="address"
                label="Domicilio"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <FormInput
                id="dni"
                label="DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
              <ErrorMessage message={errorMessage} />
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
