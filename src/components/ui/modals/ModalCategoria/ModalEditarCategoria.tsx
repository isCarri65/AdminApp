import { Formik } from "formik";
import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import styles from "./ModalCreateCategoria.module.css";
import { CategoriaService } from "../../../../service/CategoriaService";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { CategoryFormInputsEditar } from "../../CategoryFormInputs.tsx/CategoryFormInputEditar";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";
import { Button } from "react-bootstrap";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
interface IModalCreateCompany {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  categoriaEdit: ICategorias;
}

interface IinitialValues {
  id: number;
  denominacion: string;
  eliminado: boolean;
  sucursales: number[];
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | null;
  articulos: IProductos | null;
}

// Definición del componente ModalCategoria
export const ModalEditarCategoria: FC<IModalCreateCompany> = ({
  openModal,
  setOpenModal,
  categoriaEdit,
}) => {
  const categeoriaService = new CategoriaService();
  console.log(categoriaEdit);
  const initialValues: ICategorias = categoriaEdit;
  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
  };

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
          <Modal.Title className={styles.title}>Editar Categoria</Modal.Title>
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
                if (categoriaEdit.categoriaPadre === undefined) {
                  console.log("SUBCATEGORIA");
                  const subCategoriaUpdate: IUpdateCategoria = {
                    id: values.id,
                    denominacion: values.denominacion,
                    eliminado: values.eliminado,
                    idEmpresa: 0,
                    idSucursales: values.sucursales?.map((e) => e.id),
                    idCategoriaPadre: values.categoriaPadre?.id,
                  };
                  await categeoriaService.updateCategoria(categoriaEdit?.id, subCategoriaUpdate);
                  handleClose();
                } else {
                  const categoriaUpdate: IUpdateCategoria = {
                    id: values.id,
                    denominacion: values.denominacion,
                    eliminado: values.eliminado,
                    idEmpresa: 0,
                    idSucursales: values.sucursales.map((e) => e.id),
                    idCategoriaPadre: values.categoriaPadre?.id,
                  };
                  await categeoriaService.updateCategoria(categoriaEdit?.id, categoriaUpdate);
                  handleClose();
                }
              } catch (error) {
                console.error("Error al enviar los datos:", error);
                // Podrías mostrar una notificación de error aquí si lo deseas
              }
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <CategoryFormInputsEditar idSucursales={categoriaEdit.sucursales} />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
