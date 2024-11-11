

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

export const Home = () => {
  const {id} = useParams()
  const [empresas, setEmpresas] = useState<IEmpresa[]>([])
  const [empresaActiva, setEmpresaA ] = useState<IEmpresa| null>(null)
  const dispatch = useAppDispatch()
  const stateEmpresaActiva = useAppSelector((state)=> state.empresa.empresaActiva)
  const empresaList = useAppSelector((state)=>state.empresa.empresaList)
  const [openModalInfo, setOpenModalInfo] = useState(false);


  const empresaService = new EmpresaService()
  const getEmpresaActiva = async ()=> {
    if (id){
    await empresaService.getById(Number.parseInt(id)).then((emp) => {
      if (emp) dispatch(setEmpresaActiva(emp))
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
  }, [])
  
  useEffect(()=>{
    setEmpresas(empresaList)
  }, [empresaList])
  useEffect(()=>{
    setEmpresaA(stateEmpresaActiva)
  }, [stateEmpresaActiva])

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
          {empresaActiva?
          <SucursalComponent company={empresaActiva} setOpenModalInfo={setOpenModalInfo} />
          : <p>NO se ha elegido ninguna empresa</p>
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
