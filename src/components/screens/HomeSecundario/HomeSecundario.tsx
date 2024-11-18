

import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { EmpresaService } from "../../../service/EmpresaService";
import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setEmpresaActiva, setEmpresaList } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import { useParams } from "react-router-dom";
import styles from "./HomeSecundario.module.css"
import { NavBar } from "../navBar/NavBar";
import { SucursalModalInfo } from "../../ui/modals/SucursalModalInfo/SucursalModalInfo";
import { PaisService } from "../../../service/PaisService";
import { ProvinciaService } from "../../../service/ProvinciaService";
import { LocalidadesService } from "../../../service/LocalidadService";
import { setPaisesList } from "../../../redux/slices/PaisReducer/PaisReducer";
import { setProvinciasList } from "../../../redux/slices/ProvinciaReducer/ProvincisReducer";
import { setLocalidadesList } from "../../../redux/slices/LocalidadReducer/LocalidadReducer";

export const Home = () => {

  const {id} = useParams()
  const dispatch = useAppDispatch()
  //estado para abrir y cerrar el modal de mostrar informacion de sucursales
  const [openModalInfo, setOpenModalInfo] = useState(false);
  //instanciar servicios
  const paisService = new PaisService();
  const provinciaService = new ProvinciaService();
  const localidadService = new LocalidadesService();
  const empresaService = new EmpresaService()
  
  const empresaActiva = useAppSelector((state)=>state.empresa.empresaActiva)
  const getPaises = async () => {
    await paisService.getAllPaises().then((paises) => {
      dispatch(setPaisesList(paises))
    });
  };
  const getProvincias = async () => {
    await provinciaService.getAllProvincias().then((provincias) => {
      dispatch(setProvinciasList(provincias))
    });
  };
  const getLocalidades = async () => {
    await localidadService
      .getAll()
      .then((localidades) => dispatch(setLocalidadesList(localidades)));
  };

  const getEmpresaActiva = async ()=> {
    if (id){
    await empresaService.getById(Number.parseInt(id)).then((emp) => {
      if (emp) {
        dispatch(setEmpresaActiva(emp))
      }
    })
    }
  }

  const getEmpresas = async ()=>{
    await  empresaService.getAllEmpresas().then((datos)=>{
      dispatch(setEmpresaList(datos))
    })
  }

  useEffect(()=>{
    console.log("Montar Componente")
    getEmpresas()
    getEmpresaActiva()
    getProvincias()
    getPaises()
    getLocalidades()
  }, [])
  
  
  return (
    <>
      <div
        style={{
        }}
      >
        <header className={`${styles.headerC} d-flex justify-content-center align-items-center flex-column`}>
          <NavBar getEmpresas={getEmpresas}/>
        </header>
        <div >
          {empresaActiva ?
          <SucursalComponent company={empresaActiva} setOpenModalInfo={setOpenModalInfo} />
          : <p>Cargando Sucursales</p>
          }
        </div>

      </div>
      <div
        className={openModalInfo ? styles.openModalInfo : styles.closeModalInfo}
      >
        <SucursalModalInfo setOpenModalInfo={setOpenModalInfo} />
      </div>
    </>
  );
};
