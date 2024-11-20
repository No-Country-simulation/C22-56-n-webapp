import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para las rutas

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí puedes agregar lógica para la autenticación
    if (email === "" || password === "") {
      setErrorMessage("Por favor, complete todos los campos.");
    } else {
      setErrorMessage("");
      console.log("Autenticando...", email, password);
      // Llamada a la API o lógica para iniciar sesión
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
      <p>
        <Link to="/">Volver al Inicio</Link>{" "}
        {/* Enlace que redirige a la ruta principal */}
      </p>
    </div>
  );
};

export default Login;
