import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function AlmacenPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const almacenData = [
    { id: 1, nombre: "Almacén Central", telefono: "3123456789", direccion: "Calle 123", ciudad: "Bogotá" },
    { id: 2, nombre: "Depósito Norte", telefono: "3134567890", direccion: "Carrera 45", ciudad: "Medellín" },
    { id: 3, nombre: "Bodega Sur", telefono: "3145678901", direccion: "Avenida 10", ciudad: "Cali" },
    { id: 3, nombre: "Bodega Sur", telefono: "3145678901", direccion: "Avenida 10", ciudad: "Cali" },
    { id: 3, nombre: "Bodega Sur", telefono: "3145678901", direccion: "Avenida 10", ciudad: "Cali" },
    { id: 3, nombre: "Bodega Sur", telefono: "3145678901", direccion: "Avenida 10", ciudad: "Cali" },
    { id: 3, nombre: "Bodega Sur", telefono: "3145678901", direccion: "Avenida 10", ciudad: "Cali" },
    // Agrega más registros aquí...
  ];

  const filteredData = almacenData.filter((almacen) =>
    Object.values(almacen).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>ALMACÉN</h1>
          <div className="header-icons">
            <div
              className="icon-wrapper"
              onClick={() => {
                setShowNotifPopover(!showNotifPopover);
                setShowUserPopover(false);
              }}
            >
              <FiBell size={40} style={{ marginRight: "16px", cursor: "pointer" }} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Alerta de stock bajo</li>
                    <li>Nuevo ingreso registrado</li>
                  </ul>
                </div>
              )}
            </div>

            <div
              className="icon-wrapper"
              onClick={() => {
                setShowUserPopover(!showUserPopover);
                setShowNotifPopover(false);
              }}
            >
              <FiUser size={40} style={{ cursor: "pointer" }} />
              {showUserPopover && (
                <div className="popover">
                  <p><strong>Usuario</strong></p>
                  <p>Juan Pérez</p>
                  <p>juan@gmail.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <LuSearch />
          </button>
        </div>

        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Almacen</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((almacen) => (
              <tr key={almacen.id}>
                <td>{almacen.id}</td>
                <td>{almacen.nombre}</td>
                <td>{almacen.telefono}</td>
                <td>{almacen.direccion}</td>
                <td>{almacen.ciudad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlmacenPage;

