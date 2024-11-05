import CompanyCard from '../../ui/CompanyCard/CompanyCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { EmpresaService } from '../../../service/EmpresaService';
import { setEmpresaActiva, setEmpresaList } from '../../../redux/slices/CompanySlices/EmpresaSlice';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { useNavigate } from 'react-router-dom';
import { ModalCreateCompany } from '../../ui/modals/ModalCreateCompany/ModalCreateCompany';
import styles from "./HomePrincipal.module.css"


export const HomePrincipal = () => {

  const navigate = useNavigate()
  const [empresas, setEmpresas] = useState<IEmpresa[]>([])
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const empresaList = useAppSelector((state)=>state.empresa.empresaList)


  const empresaService = new EmpresaService()
  const getEmpresas = async ()=>{
    await  empresaService.getAllEmpresas().then((datos)=>{
      dispatch(setEmpresaList(datos))
    })
  }
  useEffect(()=>{
    console.log("Montar Componente")
    getEmpresas()
  }, [])
  useEffect(()=>{
    setEmpresas(empresaList)
  }, [empresaList])


  const handleCardCompany = (empresa: IEmpresa)=>{
    dispatch(setEmpresaActiva(empresa))
    navigate(`/HomeSecundario/:${empresa.id}`)
  }
  return (
    <div  className={styles.mainContainer}>
      <div className={styles.headerC}>
        <div className={styles.titleContainer}>
          <h1>Sistema de Gestión de Empresas</h1>
        </div>
      </div>
      <div style={{
        backgroundColor: "#ffe",
        width: "100%",
        padding: "20px 80px",
      }}>
      <div className={styles.containerCompanys} >
        {empresas.map((empresa, index) => (
          <div className={styles.cardContainer} onClick={()=> handleCardCompany(empresa)}>
          <CompanyCard setOpenModal={setOpenModal} company={empresa} key={index}/>
          </div>
        ))}
      </div>
      </div>
      <ModalCreateCompany getEmpresas={getEmpresas} setOpenModal={setOpenModal} openModal={openModal} />
    </div>
  );
};



