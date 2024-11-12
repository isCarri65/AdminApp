

import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { EmpresaService } from "../../../service/EmpresaService";
import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useAppDispatch } from "../../../Hooks/hooks";
import { setEmpresaList } from "../../../redux/slices/CompanySlices/EmpresaSlice";
import { useParams } from "react-router-dom";
import styles from "./HomeSecundario.module.css"
import { NavBar } from "../navBar/NavBar";
import { SucursalModalInfo } from "../../ui/modals/SucursalModalInfo/SucursalModalInfo";

export const Home = () => {
  const {id} = useParams()
  const [company, setCompany] = useState<IEmpresa|null>(null)
  const dispatch = useAppDispatch()
  const [openModalInfo, setOpenModalInfo] = useState(false);


  const empresaService = new EmpresaService()
  const getEmpresaActiva = async ()=> {
    if (id){
    await empresaService.getById(Number.parseInt(id)).then((emp) => {
      if (emp) {
        setCompany(emp)
      }
    })
    } else {
      console.log("id es nulo")
    }
  }
  const getEmpresas = async ()=>{
    await  empresaService.getAllEmpresas().then((datos)=>{
      dispatch(setEmpresaList(datos))
    })
  }
  const getSucursales = (empresa:IEmpresa)  => {
    setCompany(empresa)
  }

  useEffect(()=>{
    console.log("Montar Componente")
    getEmpresas()
    getEmpresaActiva()
  }, [])
  
  
  return (
    <>
      <div
        style={{
        }}
      >
        <header className={`${styles.headerC} d-flex justify-content-center align-items-center flex-column`}>
          <NavBar getEmpresas={getEmpresas} getSucursales={getSucursales} company={company}/>
        </header>
        <div >
          {company ?
          <SucursalComponent company={company} setOpenModalInfo={setOpenModalInfo} />
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
