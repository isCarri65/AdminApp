import { Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}
      <Navbar />
      {/* Definición de las rutas */}
      <Routes>
        {/* Ruta para la pantalla de personas */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};