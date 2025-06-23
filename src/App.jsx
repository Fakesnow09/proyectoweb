import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';

import Inventariospage from './pages/inventariospage';
import ClientesPage from './pages/clientespage';
import ProdutosPage from './pages/productospage';
import PedidosPage from './pages/pedidospage';
import AlmacenPage from './pages/almacenpage';
import CargaPage from './pages/cargapage';
import TransportePage from './pages/transportepage';
import RutaPage from './pages/rutapage';
import EntregasPage from './pages/entregaspage';
import Sidebar from './components/sidebar';
import PrivateRoute from './routes/Privateroutes';

import './App.css';

function PrivateLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas privadas protegidas */}
        <Route
          path="/inventarios"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Inventariospage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ClientesPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <ProdutosPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <PedidosPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/almacen"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <AlmacenPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/carga"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <CargaPage/>
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transporte"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <TransportePage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ruta"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <RutaPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/entregas"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <EntregasPage />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
