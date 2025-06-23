 import React, { useEffect, useState } from "react"; 
 import "../Styles/page.css"; import { LuSearch } from "react-icons/lu"; 
 import { FiBell, FiUser } from "react-icons/fi";

function CargaPage() { 
  const [cargaData, setCargaData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [form, setForm] = useState({ id: "", idTransporte: "", descripcion: "", peso: "", estado: "" }); 
  const [modoEdicion, setModoEdicion] = useState(false); const [showUserPopover, setShowUserPopover] = useState(false); 
  const [showNotifPopover, setShowNotifPopover] = useState(false);

const URL = "http://localhost:8080/proyecto-logistica/carga";

useEffect(() => { 
  fetch(URL) 
  .then((res) => res.json()) 
  .then((data) => setCargaData(data)) 
  .catch((err) => console.error("Error al consultar:", err)); 
}, []);

const handleChange = (e) => { 
  setForm({ ...form, [e.target.name]: e.target.value }); 
};

const limpiarFormulario = () => { 
  setForm({ id: "", idTransporte: "", descripcion: "", peso: "", estado: "" }); 
  setModoEdicion(false); 
};

const handleSubmit = (e) => { 
  e.preventDefault(); const formData = new FormData();

formData.append("accion", modoEdicion ? "actualizar" : "insertar");
if (modoEdicion) formData.append("id", form.id);
formData.append("idTransporte", form.idTransporte);
formData.append("descripcion", form.descripcion);
formData.append("peso", form.peso);
formData.append("estado", form.estado);

fetch(URL, {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => {
    alert(data.mensaje);
    limpiarFormulario();
    return fetch(URL);
  })
  .then((res) => res.json())
  .then((data) => setCargaData(data));

};

const editar = (carga) => { 
  setForm({ id: 
    carga.idCarga, 
    idTransporte: 
    carga.idTransporte, 
    descripcion: carga.descripcion, 
    peso: carga.peso, 
    estado: carga.estado, }); 
    setModoEdicion(true); 
  };

const eliminar = (id) => { 
  const formData = new FormData(); 
  formData.append("accion", "eliminar"); 
  formData.append("id", id);

fetch(URL, {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => {
    alert(data.mensaje);
    return fetch(URL);
  })
  .then((res) => res.json())
  .then((data) => setCargaData(data));

};

const filteredData = cargaData.filter((carga) => 
  Object.values(carga).some((val) => 
    val.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
) 
);

return ( <div className="page-container"> 
          <div className="page-content"> 
            <div className="page-header"> 
              <h1>CARGA</h1> <div className="header-icons"> 
                <div className="icon-wrapper" onClick={() => { setShowNotifPopover(!showNotifPopover); setShowUserPopover(false); }}> <FiBell size={40} /> {showNotifPopover && ( <div className="popover"> <p><strong>Notificaciones</strong></p> <ul> <li>Nueva carga agregada</li> <li>Estado actualizado</li> </ul> </div> )} </div> <div className="icon-wrapper" onClick={() => { setShowUserPopover(!showUserPopover); setShowNotifPopover(false); }}> <FiUser size={40} /> {showUserPopover && ( <div className="popover"> <p><strong>Usuario</strong></p> <p>Juan Pérez</p> <p>juan@gmail.com</p> </div> )} </div> </div> </div>

<div className="search-bar">
      <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button className="search-button"><LuSearch /></button>
    </div>

    <form className="formulario-crud" onSubmit={handleSubmit}>
      <input type="number" name="idTransporte" value={form.idTransporte} onChange={handleChange} placeholder="Id_Transporte" required />
      <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
      <input type="number" name="peso" value={form.peso} onChange={handleChange} placeholder="Peso (kg)" required />
      <input type="text" name="estado" value={form.estado} onChange={handleChange} placeholder="Estado" required />
      <button type="submit">{modoEdicion ? "Actualizar" : "Insertar"}</button>
      {modoEdicion && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
    </form>

    <table className="page-table">
      <thead>
        <tr>
          <th>Id_Carga</th>
          <th>Id_Transporte</th>
          <th>Descripción</th>
          <th>Peso</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((c) => (
          <tr key={c.idCarga}>
            <td>{c.idCarga}</td>
            <td>{c.idTransporte}</td>
            <td>{c.descripcion}</td>
            <td>{c.peso}</td>
            <td>{c.estado}</td>
            <td>
              <button onClick={() => editar(c)} style={{ marginRight: "5px" }}>Editar</button>
              <button onClick={() => eliminar(c.idCarga)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

); }

export default CargaPage;