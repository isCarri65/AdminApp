import { FC, useEffect, useState } from "react";
import styles from "./CompanyModalInfo.module.css"
import noImage from "../../../../assets/images/noImage.jpeg";
import { useAppSelector } from "../../../../Hooks/hooks";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface IPropsCompanyModalInfo {
  setOpenModalInfo: (valor: boolean) => void;
}

export const CompanyModalInfo: FC<IPropsCompanyModalInfo> = ({setOpenModalInfo }) => {
  const StateEmpresaActiva = useAppSelector((state)=> state.empresa.empresaActiva)
  const [empresaActiva, setEmpresaActiva] = useState<IEmpresa|null>(null)

  useEffect(()=>{
    console.log("cambio de empresa Activa en modal info")
    setEmpresaActiva(StateEmpresaActiva)
  },[StateEmpresaActiva])
  
  return (
    <div className={styles.modalOverlay} onClick={()=> setOpenModalInfo(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={()=>setOpenModalInfo(false)}>
          &times;
        </button>
        {empresaActiva ? ( 
          <div>
        <h2 className={styles.title}>{empresaActiva.nombre}</h2>
        <p><strong>Razón Social:</strong> {empresaActiva.razonSocial}</p>
        <p><strong>Cuil:</strong> {empresaActiva.cuit}</p>
        <div  className={styles.logoContainer}>
        <p><strong>Logo:</strong></p>
        { empresaActiva.logo ? (
          <div>
            <img className={styles.img} src={empresaActiva.logo} alt={`${empresaActiva.nombre} logo`}/>
         </div>
        ):(
          <div>
            <img
              src={noImage} // Muestra una imagen de reemplazo si no hay imagen cargada
              alt="Uploaded"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          </div>
        )}
        </div>
        </div>
      ) : (<p>Cargando Datos</p>)}
      </div>
    </div>
  );
};
