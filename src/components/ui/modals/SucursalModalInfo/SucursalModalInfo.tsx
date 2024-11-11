import { FC } from "react";
import styles from "./SucursalModalInfo.module.css"
import noImage from "../../../../assets/images/noImage.jpeg";
import { useAppSelector } from "../../../../Hooks/hooks";
interface IPropsSucursalModalInfo {
  setOpenModalInfo: (valor: boolean) => void;
}

export const SucursalModalInfo: FC<IPropsSucursalModalInfo> = ({setOpenModalInfo }) => {
  const sucursalActiva = useAppSelector((state)=> state.sucursal.sucursalActivo)
 
  return (
    <div className={styles.modalOverlay} onClick={()=> setOpenModalInfo(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={()=>setOpenModalInfo(false)}>
          &times;
        </button>
        {sucursalActiva ? ( 
          <div>
        <h2 className={styles.title}>{sucursalActiva.nombre}</h2>
        <p><strong>Horario:</strong> {sucursalActiva.horarioApertura} - {sucursalActiva.horarioCierre}</p>
        <p><strong>Casa Matriz:</strong> {sucursalActiva.esCasaMatriz ? 'Sí' : 'No'}</p>
        <p><strong>Coordenadas:</strong> {sucursalActiva.latitud}, {sucursalActiva.longitud}</p>
        <p><strong>Domicilio:</strong> {sucursalActiva.domicilio.calle} {sucursalActiva.domicilio.numero}</p>
        <p><strong>Edificio:</strong> Piso {sucursalActiva.domicilio.piso}, Depto {sucursalActiva.domicilio.nroDpto}</p>
        <p><strong>Codigo Postal:</strong>  {sucursalActiva.domicilio.cp}  </p>
        <p><strong>Localidad:</strong> {sucursalActiva.domicilio.localidad.nombre}</p>
        <p><strong>Provincia:</strong> {sucursalActiva.domicilio.localidad.provincia.nombre}</p>
        <p><strong>País:</strong> {sucursalActiva.domicilio.localidad.provincia.pais.nombre}</p>
        <div  className={styles.logoContainer}>
        <p><strong>Logo:</strong></p>
        { sucursalActiva.logo ? (
          <div>
            <img className={styles.img} src={sucursalActiva.logo} alt={`${sucursalActiva.nombre} logo`}/>
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
