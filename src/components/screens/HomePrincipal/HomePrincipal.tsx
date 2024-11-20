import CompanyCard from '../../ui/CompanyCard/CompanyCard';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { EmpresaService } from '../../../service/EmpresaService';
import { removeEmpresaModalActiva, setEmpresaActiva, setEmpresaList } from '../../../redux/slices/CompanySlices/EmpresaSlice';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';
import { useNavigate } from 'react-router-dom';
import { ModalCreateCompany } from '../../ui/modals/ModalCreateCompany/ModalCreateCompany';
import styles from "./HomePrincipal.module.css"
import { Button } from 'react-bootstrap';
import { ModalInfoAdaptable } from '../../ui/modals/ModalInfoAdaptable/ModalInfoAdaptable';


export const HomePrincipal = () => {

  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const empresaList = useAppSelector((state)=>state.empresa.empresaList)
  const [openModalInfo, setOpenModalInfo] = useState(false)

  //Estado cuya funcion es ser la variable que se utiliza para mostrar la informacion que aparece en los modales
  const stateEmpresaModalActiva = useAppSelector((state)=>state.empresa.empresaModalActiva)


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
  //Efecto que se activa al agreagar una empresa nueva a la lista de empresas y asi reiniciar el listado de empresas
  useEffect(()=>{
    setEmpresas(empresaList)
  }, [empresaList])

  //Efecto que provoca que el estado de empresaModalActiva sea null cuando se cierre el modal de  ver informacion
  useEffect(()=>{
    if(openModalInfo === false){
      dispatch(removeEmpresaModalActiva())
    }
  }, [openModalInfo])

  //Funcion que redirije la navegacion al homeSecundario de sucursales en funcion de la empresa elegida
  const handleCardCompany = (empresa: IEmpresa)=>{
    dispatch(setEmpresaActiva(empresa))
    navigate(`/HomeSecundario/${empresa.id}`)
  }
  //Abre el modal de crear/editar empresa
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
      
      {/*Contenedor de las empresas organizadas en un grid */}
      <div className={styles.containerCompanys} >
        {empresas.map((empresa, index) => (
          <div className='d-flex justify-content-center'  onClick={()=> handleCardCompany(empresa)}  style={{width:"100%"}}>
          <CompanyCard setOpenModal={setOpenModal} company={empresa} setOpenModalInfo={setOpenModalInfo} key={index}/>
          </div>
        ))}
      </div>
      </div>
      <ModalCreateCompany getEmpresas={getEmpresas} setOpenModal={setOpenModal} openModal={openModal}/>

      {/*Modal que se mantiene oculto mientras openModalInfo sea falso */}
      <div
        className={openModalInfo ? styles.openModalInfo : styles.closeModalInfo}
      > {stateEmpresaModalActiva ? 
       <ModalInfoAdaptable<IEmpresa> setOpenModalInfo={setOpenModalInfo} objeto={stateEmpresaModalActiva}/>
        : <p>Nada</p>
      }  
    </div>
    </div>
  )
};