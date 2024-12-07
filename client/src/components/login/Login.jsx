import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Por favor, complete todos los campos.");
    } else {
      setErrorMessage("");
      console.log("Autenticando...", email, password);
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
