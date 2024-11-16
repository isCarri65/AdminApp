import CompanyCard from '../../ui/CompanyCard/CompanyCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { EmpresaService } from '../../../service/EmpresaService';
import { setEmpresaActiva, setEmpresaList } from '../../../redux/slices/CompanySlices/EmpresaSlice';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { useNavigate } from 'react-router-dom';
import { ModalCreateCompany } from '../../ui/modals/ModalCreateCompany/ModalCreateCompany';
import styles from "./HomePrincipal.module.css"
import { Button } from 'react-bootstrap';
import { CompanyModalInfo } from '../../ui/modals/CompanyModalInfo/CompanyModalInfo';


export const HomePrincipal = () => {

  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const empresaList = useAppSelector((state)=>state.empresa.empresaList)
  const [openModalInfo, setOpenModalInfo] = useState(false)


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
    navigate(`/HomeSecundario/${empresa.id}`)
  }
  const handleOpenModal = ()=>{
    setOpenModal(true)
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
        padding: "20px 30px",
      }}>
      <Button
          className={styles.buttonModal}
          onClick={handleOpenModal}
        >Crear Empresa</Button>
      <div className={styles.containerCompanys} >
        {empresas.map((empresa, index) => (
          <div className='d-flex justify-content-center'  onClick={()=> handleCardCompany(empresa)} key={index} style={{width:"100%"}}>
          <CompanyCard setOpenModal={setOpenModal} company={empresa} setOpenModalInfo={setOpenModalInfo} key={index}/>
          </div>
        ))}
      </div>
      </div>
      <ModalCreateCompany getEmpresas={getEmpresas} setOpenModal={setOpenModal} openModal={openModal}/>
      <div
        className={openModalInfo ? styles.openModalInfo : styles.closeModalInfo}
      >
        <CompanyModalInfo setOpenModalInfo={setOpenModalInfo} />
      </div>
    </div>
  );
};



