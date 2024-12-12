import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Por favor, complete todos los campos.");
    } else {
      try {
        setErrorMessage("");
        const response = await axios.post("/login", {
          email,
          password,
        });
        console.log("Login exitoso", response.data);
        onClose(); // Close the modal on successful login
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error en el proceso de login");
        }
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleLogin}
            />
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
