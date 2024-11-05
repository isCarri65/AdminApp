import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/HomeSecundario/HomeSecundario";
import { HomePrincipal } from "../components/screens/HomePrincipal/HomePrincipal";
import { NavBarSide } from "../components/screens/navBarSide/NavBarSide";

export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}

      {/* Definición de las rutas */}
      <Routes>
        {/* Rutas */}
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/HomeSecundario/:id" element={<Home />} />

        {/*Aux */}
        <Route path="/navBarSide" element={<NavBarSide />} />
      </Routes>
    </>
  );
};
