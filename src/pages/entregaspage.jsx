import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function EntregasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const entregasData = [
    { id: 4, pedido: 7, transporte: 8, salida: "30 Ene, 2024", llegada: "01 Feb, 2024" },
    { id: 5, pedido: 6, transporte: 9, salida: "01 Feb, 2024", llegada: "03 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    { id: 6, pedido: 8, transporte: 10, salida: "05 Feb, 2024", llegada: "08 Feb, 2024" },
    // Puedes agregar más registros si lo deseas
  ];

  const filteredData = entregasData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>ENTREGAS</h1>
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
                    <li>Entrega programada</li>
                    <li>Actualización de llegada</li>
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
              <th>Id_Entrega</th>
              <th>Id_Pedido</th>
              <th>Id_Transporte</th>
              <th>Fecha_salida</th>
              <th>Fecha_llegada</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.pedido}</td>
                <td>{item.transporte}</td>
                <td>{item.salida}</td>
                <td>{item.llegada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EntregasPage;
