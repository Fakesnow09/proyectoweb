import React, { useState } from "react";
import "../Styles/page.css";
import { LuSearch } from "react-icons/lu";
import { FiBell, FiUser } from "react-icons/fi";

function VehiculoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserPopover, setShowUserPopover] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);

  const vehiculos = [
    {id: 8, marca: "Toyota", placa: "PHH-456C", estado: "Disponible" },
    {id: 9, marca: "Chevrolet", placa: "ABC-123", estado: "En mantenimiento" },
    {id: 10, marca: "Ford", placa: "XYZ-789", estado: "Disponible" },
    {id: 11, marca: "Nissan", placa: "LMN-456", estado: "Fuera de servicio"},
    {id: 11, marca: "Nissan", placa: "LMN-456", estado: "Fuera de servicio"},
    {id: 11, marca: "Nissan", placa: "LMN-456", estado: "Fuera de servicio"},
    {id: 11, marca: "Nissan", placa: "LMN-456", estado: "Fuera de servicio"},
    {id: 11, marca: "Nissan", placa: "LMN-456", estado: "Fuera de servicio"},

    // Agrega más si deseas
  ];

  const filteredVehiculos = vehiculos.filter((vehiculo) =>
    Object.values(vehiculo).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1>VEHICULO</h1>
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
                    <li>Revisión técnica pendiente</li>
                    <li>Vehículo asignado a transporte</li>
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
              <th>Id_Vehiculo</th>
              <th>Marca</th>
              <th>Placa</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehiculos.map((v, index) => (
              <tr key={index}>
                <td>{v.id}</td>
                <td>{v.marca}</td>
                <td>{v.placa}</td>
                <td>{v.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehiculoPage;
