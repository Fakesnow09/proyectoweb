import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function RutaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const rutaData = [
    { id: 7, origen: "Bodega", destino: "Tienda La 6", tiempo: "5 horas", vehiculo: "Camión" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    { id: 8, origen: "Centro", destino: "Sucursal Norte", tiempo: "3 horas", vehiculo: "Moto" },
    // Agrega más si deseas
  ];

  const filteredData = rutaData.filter((ruta) =>
    Object.values(ruta).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>RUTA</h1>
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
                  <strong>Notificaciones</strong>
                  <ul>
                    <li>Ruta pendiente</li>
                    <li>Ruta actualizada</li>
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
                  <strong>Usuario</strong>
                  <p>Juan Pérez</p>
                  <p>juan@email.com</p>
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
              <th>Id_Ruta</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Tiempo_Estimado</th>
              <th>Tipo_Vehiculo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((ruta, index) =>(
              <tr key={index}>
                <td>{ruta.id}</td>
                <td>{ruta.origen}</td>
                <td>{ruta.destino}</td>
                <td>{ruta.tiempo}</td>
                <td>{ruta.vehiculo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RutaPage;

