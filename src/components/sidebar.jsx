// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { CiGrid2H } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // o el nombre de tu clave/token
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <CiGrid2H size={50} color="#fff" />
        <h2>LOGISTICS MANAGEMENT</h2>
      </div>

      <ul className="sidebar-menu">
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/inventarios">Inventarios</Link></li>
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/almacen">Almacén</Link></li>
        <li><Link to="/carga">Carga</Link></li>
        <li><Link to="/transporte">Transporte</Link></li>
        <li><Link to="/vehiculo">Vehículo</Link></li>
        <li><Link to="/ruta">Ruta</Link></li>
        <li><Link to="/entregas">Entregas</Link></li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut style={{ marginRight: "8px" }} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
