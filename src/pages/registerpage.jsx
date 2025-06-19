import React from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Aquí iría la lógica para crear cuenta...

    // Redirigir a Inventarios
    navigate("/clientes");
  };
  return (
    <div className="register-container">
      <div className="background-overlay"></div>
      <div className="register-box">
        <div className="register-left">
          <h2>LOGISTICS<br />MANAGEMENT</h2>
          <p>¿Ya tienes cuenta?</p>
          <Link to="/">
            <button className="login-button">Iniciar sesión</button>
          </Link>
        </div>

        <div className="register-right">
          <h3>Registrarse</h3>
          <input type="text" placeholder="Nombre completo" />
          <input type="text" placeholder="Tipo de documento" />
          <input type="text" placeholder="Número de identificación" />
          <button className="register-submit" onClick={handleRegister}>Ingresar</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
