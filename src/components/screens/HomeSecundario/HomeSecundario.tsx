

import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { EmpresaService } from "../../../service/EmpresaService";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setEmpresaActiva, setEmpresaList } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import { useParams } from "react-router-dom";
import styles from "./HomeSecundario.module.css"
import { NavBar } from "../navBar/NavBar";
import { PaisService } from "../../../service/PaisService";
import { ProvinciaService } from "../../../service/ProvinciaService";
import { LocalidadesService } from "../../../service/LocalidadService";
import { setPaisesList } from "../../../redux/slices/PaisReducer/PaisReducer";
import { setProvinciasList } from "../../../redux/slices/ProvinciaReducer/ProvincisReducer";
import { setLocalidadesList } from "../../../redux/slices/LocalidadReducer/LocalidadReducer";
import { ModalInfoAdaptable } from "../../ui/modals/ModalInfoAdaptable/ModalInfoAdaptable";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { removeSucursalActivo, setSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";

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
  const sucursalActivo = useAppSelector((state)=>state.sucursal.sucursalActivo)

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
    if(openModalInfo === false) {
      dispatch(removeSucursalActivo())
    }
  },[openModalInfo])

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
        {sucursalActivo? <ModalInfoAdaptable<ISucursal> setOpenModalInfo={setOpenModalInfo} objeto={sucursalActivo}/> : <p>Cargando...</p>}
      </div>
    </>
  );
};
