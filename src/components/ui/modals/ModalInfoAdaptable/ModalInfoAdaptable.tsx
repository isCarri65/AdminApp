import styles from "./ModaInfoAdaptable.module.css";
import noImage from "../../../../assets/images/noImage.jpeg";
import { useEffect, useState } from "react";
interface IPropsSucursalModalInfo<T> {
  setOpenModalInfo: (valor: boolean) => void;
  objeto: T;
}

export const ModalInfoAdaptable = <T,>({
  setOpenModalInfo,
  objeto,
}: IPropsSucursalModalInfo<T>) => {
  
  const [propiedades, setPropiedades] = useState<any[][]>([])

  const textoPropiedades = {
    nombre: "Nombre",
    razonSocial: "Razón Social",
    cuit: "CUIT",
    latitud: "Latitud",
    longitud: "Longitud",
    esCasaMatriz: "Es Casa Matriz",
    horarioCierre: "Horario Cierre",
    horarioApertura: "Horario Apertura",
    logo: "Logo",
    denominacion: "Denominación",
    imagen: "Imagen",
    domicilio: "Domicilio",
    precioVenta: "Precio de Venta",
    descripcion: "Descripción",
    habilitado: "Habilitado",
    categoria: "Categoría",
    imagenes: "Imágenes"
  }
  useEffect(()=> {
    if(objeto) {
      const propiedadesIniciales = Object.entries(objeto)
      
      const propiedadesFiltradas = propiedadesIniciales.filter((values)=> !["id", "eliminado", "empresa", "localidad", "pais","sucursales", "categorias", "subcategorias", "categoriaPadre", "articulos","alergenos",].includes(values[0]))
      const propiedadesEditadas = propiedadesFiltradas.map((arreglo)=>
      Object.keys(textoPropiedades).includes(arreglo[0]) ? ([textoPropiedades[arreglo[0]], arreglo[1]]) : ([arreglo[0], arreglo[1]])
        )
      const propiedadesEditadas2 = propiedadesEditadas
        propiedadesEditadas.forEach((arreglo: any[], index: number)=>{
          if(["Logo", "Imagen", "Imagenes"].includes(arreglo[0])){
            propiedadesEditadas2.splice(index,1)
            propiedadesEditadas2.splice(propiedadesEditadas.length, 0, arreglo )
          }
        })
      console.log(propiedadesEditadas2)
      
      setPropiedades(propiedadesEditadas)
    }
  },[])
  
  const handleCloseModal = ()=>{
    setOpenModalInfo(false)
    //Asegurense de borrar el parametro 'objeto' en donde se instancia el modal, sino no va a detectar los cambios
  }
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setOpenModalInfo(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={{textAlign: "center"}}>Ver Informacion</h3>
        <button
          className={styles.closeButton}
          onClick={handleCloseModal}
        >
          &times;
        </button>
        {objeto ? (
          propiedades.map(([key, value]) => (
            <div>
              {/*Condicional 1*/}
              {typeof value === "object" && value !== null ? (
                <div>
                  <p>
                    <strong>Domicilio:</strong> {value.calle} {value.numero}
                  </p>
                  <p>
                    <strong>Edificio:</strong> Piso {value.piso}, Depto{" "}
                    {value.nroDpto}
                  </p>
                  <p>
                    <strong>Codigo Postal:</strong> {value.cp}{" "}
                  </p>
                </div>
              ) : key === "Logo" && value !== null ? (
                <div  className={styles.logoContainer}>
                  <p>
                    <strong>{key}:</strong>
                  </p>
                  <div>
                    <img
                      className={styles.img}
                      src={value}
                      alt={`${propiedades[0][1]} logo`}
                    />
                  </div>
                </div>
              ) : key === "Logo" && value === null ? (
                <div  className={styles.logoContainer}>
                  <p>
                    <strong>{key}:</strong>
                  </p>
                  <img
                    src={noImage} // Muestra una imagen de reemplazo si no hay imagen cargada
                    alt="Uploaded"
                    style={{ maxWidth: "100px", height: "auto" }}
                  />
                </div>
              ) : (
                <p>
                  <strong>{key}: </strong>
                  {typeof value === "boolean"?(value? "Si": "No"): value}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>Nada</p>
        )}
      </div>
    </div>
  );
};
