import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function CargaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const cargaData = [
    { id: 1, transporte: 3, descripcion: "Carga de alta complejidad", peso: "500 kilos", estado: "Despachado" },
    { id: 2, transporte: 4, descripcion: "Carga refrigerada", peso: "350 kilos", estado: "En tránsito" },
    { id: 3, transporte: 2, descripcion: "Carga urgente", peso: "700 kilos", estado: "Pendiente" },
    { id: 3, transporte: 2, descripcion: "Carga urgente", peso: "700 kilos", estado: "Pendiente" },
    { id: 3, transporte: 2, descripcion: "Carga urgente", peso: "700 kilos", estado: "Pendiente" },
    { id: 3, transporte: 2, descripcion: "Carga urgente", peso: "700 kilos", estado: "Pendiente" },
    { id: 3, transporte: 2, descripcion: "Carga urgente", peso: "700 kilos", estado: "Pendiente" },
    // Puedes agregar más registros...
  ];

  const filteredData = cargaData.filter((carga) =>
    Object.values(carga).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>CARGA</h1>
          <div className="header-icons">
            <div
              className="icon-wrapper"
              onClick={() => {
                setShowNotifPopover(!showNotifPopover); 
                setShowUserPopover(false); 
              }}
            >
              <FiBell size={40} style={{marginRight: "16px", cursor: "pointer" }} />
              {showNotifPopover && (
                <div className="popover">
                  <p><strong>Notificaciones</strong></p>
                  <ul>
                    <li>Nueva carga agregada</li>
                    <li>Actualización de estado</li>
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
              <th>Id_Carga</th>
              <th>Id_Transporte</th>
              <th>Descripción</th>
              <th>Peso</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.transporte}</td>
                <td>{item.descripcion}</td>
                <td>{item.peso}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CargaPage;
