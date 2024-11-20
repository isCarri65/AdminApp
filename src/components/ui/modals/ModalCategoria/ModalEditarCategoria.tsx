import { Formik } from "formik";
import { FC } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import styles from "./ModalCreateCategoria.module.css";
import { CategoriaService } from "../../../../service/CategoriaService";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { CategoryFormInputsEditar } from "../../CategoryFormInputs.tsx/CategoryFormInputEditar";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";
import { useAppDispatch } from "../../../../Hooks/hooks";
import { updateCategoriaInList } from "../../../../redux/slices/CategorySlices/CategoriaSlice";
interface IModalCreateCompany {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  categoriaEdit: ICategorias;
  idEmpresa: number;
  idCategoriaPadre: number | null;
}

interface IinitialValues {
  id: number;
  denominacion: string;
  eliminado: boolean;
  idEmpresa: number;
  idSucursales: number[];
  idCategoriaPadre?: number | null;
}

// Definición del componente ModalCategoria
export const ModalEditarCategoria: FC<IModalCreateCompany> = ({
  openModal,
  setOpenModal,
  categoriaEdit,
  idEmpresa,
  idCategoriaPadre,
}) => {
  const categeoriaService = new CategoriaService();
  const categoriaUpdate: IUpdateCategoria = {
    id: categoriaEdit.id,
    denominacion: categoriaEdit.denominacion,
    eliminado: categoriaEdit.eliminado,
    idEmpresa: idEmpresa,
    idSucursales: categoriaEdit.sucursales.map((sucursal) => sucursal.id),
    idCategoriaPadre: idCategoriaPadre,
  };
  const initialValues: IUpdateCategoria = categoriaUpdate;
  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
  };

  //Actualizacion de componente
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IinitialValues) => {
    try {
      if (categoriaEdit.categoriaPadre === undefined) {
        const subCategoriaUpdate: IUpdateCategoria = {
          id: values.id,
          denominacion: values.denominacion,
          eliminado: values.eliminado,
          idEmpresa: values.idEmpresa,
          idSucursales: values.idSucursales,
          idCategoriaPadre: values.idCategoriaPadre,
        };
        const updatedCategoriaHija = await categeoriaService.updateCategoria(
          categoriaEdit?.id,
          subCategoriaUpdate
        );
        dispatch(updateCategoriaInList(updatedCategoriaHija));
      } else {
        const categoriaUpdate: IUpdateCategoria = {
          id: values.id,
          denominacion: values.denominacion,
          eliminado: values.eliminado,
          idEmpresa: values.idEmpresa, //editar empresa activa
          idSucursales: values.idSucursales,
          idCategoriaPadre: null,
        };
        const updatedCategoriaPadre = await categeoriaService.updateCategoria(
          categoriaEdit?.id,
          categoriaUpdate
        );
        dispatch(updateCategoriaInList(updatedCategoriaPadre));
      }
      // Actualiza localmente el estado en Redux

      handleClose();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
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
              handleSubmit(values);
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <CategoryFormInputsEditar
                  idSucursales={categoriaEdit.sucursales}
                  idEmpresa={idEmpresa}
                  idCategoriaPadre={idCategoriaPadre}
                />
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
