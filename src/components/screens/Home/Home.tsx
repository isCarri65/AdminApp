import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";

export const Home = () => {
  const name = "Empresa 1";

  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <div
          className=" d-flex justify-content-center align-items-center flex-column"
          style={{ height: "20vh" }}
        >
          <div>
            <h1>Sistema de Gestión de Empresas</h1>
          </div>
          <div>Empresas varias</div>
        </div>
        <div style={{ height: "80vh" }}>
          <SucursalComponent company={name} />
        </div>
      </div>
    </>
  );
};
