import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginpage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("tipo", "login");
    formData.append("numeroDocumento", numeroDocumento);
    formData.append("contrasena", contrasena); // Este debe coincidir con el backend

    try {
      const response = await fetch("http://localhost:8080/proyecto-logistica/UsuarioServlet", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const text = await response.text();
      console.log("Respuesta del servidor:", text);

      if (text.includes("Inicio de sesión exitoso")) {
        localStorage.setItem("user", JSON.stringify({ documento: numeroDocumento }));
        alert("✅ Login exitoso");
        navigate("/clientes");
      } else {
        alert("❌ " + text);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("❌ Error al iniciar sesión");
    }
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
          <input
            type="text"
            placeholder="Número de Documento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
