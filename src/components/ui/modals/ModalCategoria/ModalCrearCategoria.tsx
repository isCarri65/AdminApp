import { Formik } from "formik";
import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import styles from "./ModalCreateCategoria.module.css";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { CategoriaService } from "../../../../service/CategoriaService";
import { CategoryFormInputs } from "../../CategoryFormInputs.tsx/CategoryFormInputs";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
interface IModalCreateCompany {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  idSucursales: number[];
  categoriasAll: ICategorias[];
}

interface IinitialValues {
  denominacion: string;
  idSucursales: number[];
  idCategoriaPadre: number | null;
}

// Definición del componente ModalCategoria
export const ModalCrearCategoria: FC<IModalCreateCompany> = ({
  openModal,
  setOpenModal,
  idSucursales,
  categoriasAll,
}) => {
  const catageoriaService = new CategoriaService();

  const initialValues: ICreateCategoria = {
    denominacion: "",
    idSucursales: [],
    idCategoriaPadre: 0 || null,
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
  };

  //   const crearInitialValues = (objOrigen: ICreateCategoria): IinitialValues => {
  //     const objDestino: IinitialValues = {
  //       denominacion: objOrigen.denominacion,
  //       idSucursales: objOrigen.idSucursales,
  //       idCategoriaPadre: objOrigen.idCategoriaPadre || null,
  //     };
  //     return objDestino;
  //   };

  return (
    <div>
      {/* Componente Modal de React Bootstrap */}
      <Modal
        className={styles.modal}
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title className={styles.title}>Crear Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={false}
            onSubmit={async (values: IinitialValues) => {
              try {
                const categoriaCreate: ICreateCategoria = {
                  denominacion: values.denominacion,
                  idSucursales: values.idSucursales,
                  idCategoriaPadre: values.idCategoriaPadre || null,
                };
                await catageoriaService.createCategoria(categoriaCreate);
                handleClose();
              } catch (error) {
                console.error("Error al enviar los datos:", error);
                // Podrías mostrar una notificación de error aquí si lo deseas
              }
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <CategoryFormInputs categoriasAll={categoriasAll} idSucursales={idSucursales} />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
