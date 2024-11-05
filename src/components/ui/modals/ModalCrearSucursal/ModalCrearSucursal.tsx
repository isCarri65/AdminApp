import { Formik } from "formik";
import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/hooks";
import { removeSucursalActivo } from "../../../../redux/slices/SucursalReducer/SucursalReducer";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../../../service/SurcusalService";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { useParams } from "react-router-dom";
import { SucursalFormInputs } from "../../SucursalFormInputs/SucursalFormInputs";
import styles from "./ModalCreateSucursal.module.css"
import { removeImageActivo } from "../../../../redux/slices/ImageReducer/ImageReducer";
interface IModalCrearSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  getSucursales: () => void;
}

interface IinitialValues {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  nroDpto: number;
  idLocalidad: number;
  idEmpresa: number;
  logo: string | null;
}

// Definición del componente ModalPersona
export const ModalCrearSucursal: FC<IModalCrearSucursal> = ({
  openModal,
  setOpenModal,
  getSucursales,
}) => {
  const initialValues: IinitialValues = {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    calle: "",
    numero: 0,
    cp: 0,
    piso: 0,
    nroDpto: 0,
    idLocalidad: 0,
    idEmpresa: 0,
    logo: "",
  };
  const sucursalActivo = useAppSelector(
    (state) => state.sucursal.sucursalActivo
  );
  const dispatch = useAppDispatch();
  const sucursalService = new SucursalService();
  const { id } = useParams();
  const imageActivo = useAppSelector((state)=>state.image.imageStringActivo)

  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeSucursalActivo());
    dispatch(removeImageActivo())
  };

  const crearInitialValues = (objOrigen: ISucursal): IinitialValues => {
    const objDestino: IinitialValues = {
      nombre: objOrigen.nombre,
      horarioApertura: objOrigen.horarioApertura,
      horarioCierre: objOrigen.horarioCierre,
      esCasaMatriz: objOrigen.esCasaMatriz,
      latitud: objOrigen.latitud,
      longitud: objOrigen.longitud,
      calle: objOrigen.domicilio.calle,
      numero: objOrigen.domicilio.numero,
      cp: objOrigen.domicilio.cp,
      piso: objOrigen.domicilio.piso,
      nroDpto: objOrigen.domicilio.nroDpto,
      idLocalidad: objOrigen.domicilio.localidad.id,
      idEmpresa: objOrigen.empresa.id,
      logo: objOrigen.logo ? objOrigen.logo : null,
    };
    return objDestino;
  };

  return (
    <div >
      {/* Componente Modal de React Bootstrap */}
      <Modal className={styles.modal}
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          {/* Título del modal dependiendo de si se está editando o añadiendo una persona */}
          {sucursalActivo ? (
            <Modal.Title className={`${styles.title} mx-auto`}>Editar una sucursal</Modal.Title>
          ) : (
            <Modal.Title className={styles.title}>Crear una sucursal</Modal.Title>
          )}
        </Modal.Header  >
        <Modal.Body  className={styles.modalBody}>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              latitud: Yup.number().required("Campo requerido"),
              longitud: Yup.number().required("Campo requerido"),
              calle: Yup.string().required("Campo requerido"),
              numero: Yup.number().required("Campo requerido"),
              cp: Yup.number().required("Campo requerido"),
              piso: Yup.number().required("Campo requerido"),
              nroDpto: Yup.number().required("Campo requerido"),
            })}
            initialValues={
              sucursalActivo
                ? crearInitialValues(sucursalActivo)
                : initialValues
            }
            enableReinitialize={false}
            onSubmit={async (values: IinitialValues) => {
              console.log("Ramirez");
              if (id) {
                try {
                  if (sucursalActivo) {
                    const updateSucursal: IUpdateSucursal = {
                      id: sucursalActivo.id,
                      nombre: values.nombre,
                      eliminado: false,
                      horarioApertura: values.horarioApertura,
                      horarioCierre: values.horarioCierre,
                      esCasaMatriz: true,
                      latitud: values.latitud,
                      longitud: values.longitud,
                      domicilio: {
                        id: sucursalActivo.domicilio.id,
                        calle: values.calle,
                        numero: values.numero,
                        cp: values.cp,
                        piso: values.piso,
                        nroDpto: values.nroDpto,
                        idLocalidad: 1,
                      },
                      idEmpresa: Number.parseInt(id),
                      logo: imageActivo,
                      categorias: sucursalActivo.categorias,
                    };
                    const resultado = await sucursalService.updateSucursal(
                      sucursalActivo.id,
                      updateSucursal
                    );
                    console.log(resultado);
                  } else {
                    console.log("Crear Sucursal");
                    const sucursalCreate: ICreateSucursal = {
                      nombre: values.nombre,
                      horarioApertura: values.horarioApertura,
                      horarioCierre: values.horarioCierre,
                      esCasaMatriz: true,
                      latitud: values.latitud,
                      longitud: values.longitud,
                      domicilio: {
                        calle: values.calle,
                        numero: values.numero,
                        cp: values.cp,
                        piso: values.piso,
                        nroDpto: values.nroDpto,
                        idLocalidad: 1,
                      },
                      idEmpresa: Number.parseInt(id),
                      logo: imageActivo,
                    };
                    await sucursalService.createSucursal(sucursalCreate);
                  }
                  getSucursales();
                  handleClose();
                } catch (error) {
                  console.error("Error al enviar los datos:", error);
                  // Podrías mostrar una notificación de error aquí si lo deseas
                }
              } else {
                console.log("ID de empresa no valido");
              }
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <SucursalFormInputs />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
