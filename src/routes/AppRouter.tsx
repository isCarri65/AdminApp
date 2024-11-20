import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/HomeSecundario/HomeSecundario";
import { HomePrincipal } from "../components/screens/HomePrincipal/HomePrincipal";
import ProductTable from "../components/screens/ProductTable/ProductTable";
import CategoryTable from "../components/screens/CataegoryTable/CategoryTable";
import AlergenosTable from "../components/screens/AlergenosTable/AlergenosTable";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}

      {/* Definición de las rutas */}
      <Routes>
        {/* Rutas */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/HomeSecundario/:id" element={<Home />} />

        {/*Productos-alergenos-categorias de una sucursal */}
        <Route path="/HomeSecundario/sucursal/producto/:id" element={<ProductTable sucursalId={1} />} />
        <Route path="/HomeSecundario/sucursal/categoria/:id" element={<CategoryTable />} />
        <Route path="/HomeSecundario/sucursal/alergeno/:id" element={<AlergenosTable />} />
      </Routes>
    </>
  );
};
