

import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { EmpresaService } from "../../../service/EmpresaService";
import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setEmpresaActiva, setEmpresaList } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import { useParams } from "react-router-dom";
import styles from "./HomeSecundario.module.css"

export const Home = () => {
  const {id} = useParams()
  const [empresas, setEmpresas] = useState<IEmpresa[]>([])
  const [empresaA, setEmpresaA ] = useState<IEmpresa| null>(null)
  const dispatch = useAppDispatch()
  const empresaAc = useAppSelector((state)=> state.empresa.empresaActiva)
  const empresaList = useAppSelector((state)=>state.empresa.empresasList)


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
    setEmpresaA(empresaAc)
  }, [empresaAc])

  return (
    <>
      <div
        style={{
        }}
      >
        <header className={`${styles.headerC} d-flex justify-content-center align-items-center flex-column`}>
          <div className={styles.title}>
            <h1>Sistema de Gestión de Empresas</h1>
          </div>
          <div>Empresas varias</div>
        </header>
        <div >
          {empresaA?
          <SucursalComponent company={empresaA} />
          : <p>NO se ha elegido ninguna empresa</p>
          }
        </div>
      </div>
    </>
  );
};
