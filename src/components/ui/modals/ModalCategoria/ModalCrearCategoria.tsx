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
  idEmpresa: number;
  categoriasAll: ICategorias[];
}

interface IinitialValues {
  denominacion: string;
  idEmpresa: number;
  idCategoriaPadre: number | null;
}

// Definición del componente ModalCategoria
export const ModalCrearCategoria: FC<IModalCreateCompany> = ({
  openModal,
  setOpenModal,
  idEmpresa,
  categoriasAll,
}) => {
  const catageoriaService = new CategoriaService();

  const initialValues: ICreateCategoria = {
    denominacion: "",
    idEmpresa: 0,
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
                  idEmpresa: values.idEmpresa,
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
                <CategoryFormInputs categoriasAll={categoriasAll} idEmpresa={idEmpresa} />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
