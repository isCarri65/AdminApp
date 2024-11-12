import { FC } from "react";
import styles from "./CompanyModalInfo.module.css"
import noImage from "../../../../assets/images/noImage.jpeg";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/hooks";
import { removeEmpresaModalActiva } from "../../../../redux/slices/CompanySlices/EmpresaSlice";

interface IPropsCompanyModalInfo {
  setOpenModalInfo: (valor: boolean) => void;
}

export const CompanyModalInfo: FC<IPropsCompanyModalInfo> = ({setOpenModalInfo }) => {
  const empresaModalActiva = useAppSelector((state)=> state.empresa.empresaModalActiva)
  const dispatch = useAppDispatch()
  const closeOpenModalInfo = ()=> {
    setOpenModalInfo(false);
    dispatch(removeEmpresaModalActiva())
  }
  return (
    <div className={styles.modalOverlay} onClick={closeOpenModalInfo}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeOpenModalInfo}>
          &times;
        </button>
        {empresaModalActiva ? ( 
          <div>
        <h2 className={styles.title}>{empresaModalActiva.nombre}</h2>
        <p><strong>Razón Social:</strong> {empresaModalActiva.razonSocial}</p>
        <p><strong>Cuil:</strong> {empresaModalActiva.cuit}</p>
        <div  className={styles.logoContainer}>
        <p><strong>Logo:</strong></p>
        { empresaModalActiva.logo ? (
          <div>
            <img className={styles.img} src={empresaModalActiva.logo} alt={`${empresaModalActiva.nombre} logo`}/>
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
