import React, { useState } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [contrasena, setContrasena] = useState(""); // Nueva: contraseña

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("tipo", "registro");
    formData.append("nombreCompleto", nombreCompleto);
    formData.append("tipoDocumento", tipoDocumento);
    formData.append("numeroDocumento", numeroDocumento);
    formData.append("contrasena", contrasena);

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

      if (text.includes("Registrado correctamente")) {
        alert("✅ Registro exitoso");
        navigate("/clientes");
      } else {
        alert("❌ " + text);
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("❌ Error al registrar");
    }
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
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo de documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número de identificación"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <button className="register-submit" onClick={handleRegister}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

