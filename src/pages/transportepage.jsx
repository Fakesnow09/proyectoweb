import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function TransportePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const transporteData = [
    {id: 5, vehiculo: 8, ruta: 9, estado: "En espera", salida: "09 Ene, 2024", llegada: "12 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
    {id: 6, vehiculo: 9, ruta: 10, estado: "En tránsito", salida: "10 Ene, 2024", llegada: "13 Ene, 2024",},
  

  ];

  const filteredData = transporteData.filter((t) =>
    Object.values(t).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Encabezado con título e íconos */}
        <div className="page-header">
          <h1>TRANSPORTE</h1>
          <div className="header-icons">
            {/* Notificaciones */}
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
                  <strong>Notificaciones</strong>
                  <ul>
                    <li>Transporte pendiente</li>
                    <li>Actualización de ruta</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Usuario */}
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
                  <strong>Usuario</strong>
                  <p>Juan Pérez</p>
                  <p>juan@email.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barra de búsqueda */}
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

        {/* Tabla de transporte */}
        <table className="page-table">
          <thead>
            <tr>
              <th>Id_Transporte</th>
              <th>Id_Vehiculo</th>
              <th>Id_Ruta</th>
              <th>Estado</th>
              <th>Fecha_salida</th>
              <th>Fecha_llegada</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((t, index) => (
              <tr key={index}>
                <td>{t.id}</td>
                <td>{t.vehiculo}</td>
                <td>{t.ruta}</td>
                <td>{t.estado}</td>
                <td>{t.salida}</td>
                <td>{t.llegada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransportePage;

