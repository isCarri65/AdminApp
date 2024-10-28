import { useState } from "react";
import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { ModalCreateBranch } from "../../modals/ModalCrearSucursal/ModalCrearSucursal";

export const Home = () => {
  const name = "Empresa 1";

  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <header
          className=" d-flex justify-content-center align-items-center flex-column"
          style={{ height: "20vh" }}
        >
          <div>
            <h1>Sistema de Gestión de Empresas</h1>
          </div>
          <div>Empresas varias</div>
        </header>
        <body style={{ height: "80vh" }}>
          <SucursalComponent company={name} />
        </body>
      </div>
    </>
  );
};
