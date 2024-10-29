
import { useParams } from "react-router-dom";
import { SucursalComponent } from "../../ui/SucursalComponent/SucursalComponent";
import { EmpresaService } from "../../../service/EmpresaService";
import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setEmpresaActiva, setEmpresaList } from "../../../redux/slices/CompanySlices/EmpresaSlice";

export const Home = () => {
  
  const {id} = useParams()
  const [empresas, setEmpresas] = useState<IEmpresa[]>([])
  const dispatch = useAppDispatch()
  const idEmpresa = id ? Number.parseInt(id) : -1
  const empresaList = useAppSelector((state)=>state.empresa.empresasList)

  const empresaService = new EmpresaService()
  const getEmpresaActiva = async ()=>{
    await empresaService.getById(idEmpresa).then((empresa)=>{
      if(empresa){
      dispatch(setEmpresaActiva(empresa))
      }
    })
  }
  const getEmpresas = async ()=>{
    await  empresaService.getAll().then((datos)=>{
      dispatch(setEmpresaList(datos))
    })
  }
  useEffect(()=>{
    getEmpresas()
    getEmpresaActiva()
  }, [])
  useEffect(()=>{
    setEmpresas(empresaList)
  }, [empresaList])
 const empresaActiva = useAppSelector((state)=>state.empresa.empresaActiva)

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
        <div style={{ height: "80vh" }}>
          {empresaActiva?
          <SucursalComponent company={empresaActiva} />
          : <p>Cargando sistema</p>
          }
        </div>
      </div>
    </>
  );
};
