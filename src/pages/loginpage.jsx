// src/pages/LoginPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginpage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Usuario simulado
    const user = {
      nombre: "Nombre Ejemplo",
      documento: "12345678",
    };

    localStorage.setItem("user", JSON.stringify(user));

    navigate("/clientes");
  };

  return (
    <div className="login-container">
      <div className="background-overlay"></div>

      <div className="login-box">
        <div className="login-left">
          <h2>LOGISTICS<br />MANAGEMENT</h2>
          <p>¿No tienes cuenta aún?</p>
          <Link to="/register">
            <button className="register-button">Registrarse</button>
          </Link>
        </div>

        <div className="login-right">
          <h3>Iniciar Sesión</h3>
          <input type="text" placeholder="Nombre Completo" />
          <input type="text" placeholder="Número de documento" />
          <button className="login-button" onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
