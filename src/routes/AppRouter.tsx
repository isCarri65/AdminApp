import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/HomeSecundario/HomeSecundario";
import { HomePrincipal } from "../components/screens/HomePrincipal/HomePrincipal";
import ProductTable from "../components/screens/ProductTable/ProductTable";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}

      {/* Definición de las rutas */}
      <Routes>
        {/* Rutas */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/HomeSecundario/:id" element={<Home />} />
        <Route path="/HomeSecundario/sucursal/:id" element={<ProductTable />} />
      </Routes>
    </>
  );
};
