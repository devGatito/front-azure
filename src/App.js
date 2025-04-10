import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./pages/HomePageOne";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import TrabajadoresList from "./components/TrabajadoresList";
import TrabajadoresForm from "./components/TrabajadoresForm";
import AdminCliente from "./components/admin/AdminCliente";
import ListaVentas from "./components/ventas";
import ListaDevoluciones from "./components/devoluciones/ListaDevoluciones";
import CotizacionesList from "./components/CotizacionesList";
import CotizacionForm from "./services/CotizacionForm";
import ProductForm from "./components/admin/ProductForm";
import ProductList from "./components/admin/ProductList";
import MovimientoForm from "./components/MovimientoForm";
import MovimientosList from "./components/admin/MovimientosList";
import VehiculoForm from "./components/admin/VehiculoForm";
import VehiculosList from "./components/admin/VehiculosList";
import OrdenForm from "./components/admin/OrdenForm";
import OrdenesList from "./components/admin/OrdenesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        {/* <Route path="/" element={<HomePageOne />} />
         */}<Route path="/" element={<Login />} />
       
        {/* Ruta protegida por autenticación */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Ruta protegida por rol ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Ruta para la gestión de clientes */}
        <Route
          path="/admin/cliente"
          element={
            <AdminRoute>
              <AdminCliente />
            </AdminRoute>
          }
        />

        {/* Rutas para trabajadores dentro del admin */}
        <Route
          path="/admin/trabajadores"
          element={
            <AdminRoute>
              <TrabajadoresList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/trabajadores/crear"
          element={
            <AdminRoute>
              <TrabajadoresForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/trabajadores/editar/:id"
          element={
            <AdminRoute>
              <TrabajadoresForm />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/ventas"
          element={
            <AdminRoute>
              <ListaVentas />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/devoluciones"
          element={
            <AdminRoute>
              <ListaDevoluciones />
            </AdminRoute>
          }
        />
<Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/productos/crear"
          element={
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/productos/editar/:id"
          element={
            <AdminRoute>
              <ProductForm />
            </AdminRoute>
          }
        />

<Route
          path="/admin/movimientos"
          element={
            <AdminRoute>
              <MovimientosList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/movimientos/registrar"
          element={
            <AdminRoute>
              <MovimientoForm />
            </AdminRoute>
          }
        />

<Route
          path="/admin/vehiculos"
          element={
            <AdminRoute>
              <VehiculosList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/vehiculos/crear"
          element={
            <AdminRoute>
              <VehiculoForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/vehiculos/editar/:id"
          element={
            <AdminRoute>
              <VehiculoForm />
            </AdminRoute>
          }
        />

<Route
          path="/admin/ordenes"
          element={
            <AdminRoute>
              <OrdenesList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ordenes/crear"
          element={
            <AdminRoute>
              <OrdenForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ordenes/editar/:id"
          element={
            <AdminRoute>
              <OrdenForm />
            </AdminRoute>
          }
        />
<Route path="/admin/cotizaciones" element={<CotizacionesList />} />
        <Route path="/admin/cotizaciones/crear" element={<CotizacionForm />} />
        <Route path="/admin/cotizaciones/editar/:id" element={<CotizacionForm />} />

<Route path="/admin/cotizaciones" element={<CotizacionesList />} />
        <Route path="/admin/cotizaciones/crear" element={<CotizacionForm />} />
        <Route path="/admin/cotizaciones/editar/:id" element={<CotizacionForm />} />
        {/* Ruta de fallback */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
