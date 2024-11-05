import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { IDomicilio } from "../../../types/IDomicilio";
import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { NavBar } from "../navBar/NavBar";

export const Home = () => {

  const domicilio1 : IDomicilio = {
  id: 2,
  calle: "calle",
  numero: 1254,
  cp: 3244,
  piso: 3,
  nroDpto: 32,
  localidad: {
    nombre:"Barrancas",
    id: 4,
    provincia:{
      id:2,
      nombre: "mendoza",
      pais:{
        id: 2,
        nombre: "argentina"
      }
    }
  },
  }
  
  const sucursales : ISucursal[]=[]
  
  const empresa1: IEmpresa = {
    id: 1,
    nombre: "BENDITO RUFIAN",
    razonSocial: "Empresa de Alimentos",
    cuit: 30546790,
    logo: "https://benditorufian.com/resources/brand.svg",
    sucursales: sucursales,
    pais: {
      nombre: "Arg",
      id: 4,
    },
};
const sucursal4 : ISucursal= {
  eliminado: false,
  id: 2,
  nombre: "sucursal",
  empresa: empresa1,
  domicilio: domicilio1,
  calle: "zapata",
  latitud: 22,
  longitud: 523,
  categorias: [],
  esCasaMatriz: false,
  horarioApertura: "08 hs",
  horarioCierre: "10 hs",
}
  empresa1.sucursales.push(sucursal4)


  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
      >
        <header
          style={{ height: "20vh" }}
        >
          <NavBar></NavBar>
        </header>
        <div style={{ height: "80vh" }}>
          <SucursalComponent company={empresa1} />
        </div>
      </div>
    </>
  );
};
