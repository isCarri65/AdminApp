import { Route, Routes } from "react-router-dom";
import MainMenu from "../components/screens/Home/HomePrincipal";
import { Home } from "../components/screens/HomeSecundario/HomeSecundario";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}

      {/* Definición de las rutas */}
      <Routes>
        {/* Ruta para la pantalla de personas */}
        <Route path="/" element={<MainMenu />} />
        <Route path="/sucursales/:id" element={<Home />} />
      </Routes>
    </>
  );
};
