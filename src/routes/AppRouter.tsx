
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}
      
      {/* Definición de las rutas */}
      <Routes>
        {/* Ruta para la pantalla de personas */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};