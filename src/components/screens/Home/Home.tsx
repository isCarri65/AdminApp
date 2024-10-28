
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";

export const Home = () => {
  
  const empresa1: IEmpresa = {
    id: 1,
    nombre: "BENDITO RUFIAN",
    razonSocial: "Empresa de Alimentos",
    cuit: 30546790,
    logo: "https://benditorufian.com/resources/brand.svg",
    sucursales:[],
    pais: {
      nombre: "Arg",
      id: 4,
    },
};

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
          <SucursalComponent company={empresa1} />
        </body>
      </div>
    </>
  );
};
