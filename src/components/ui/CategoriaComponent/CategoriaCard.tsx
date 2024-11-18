import styles from "./Category.module.css";
import { FC, useEffect, useState } from "react";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { CategoriaService } from "../../../service/CategoriaService";
import { setCategoriaActiva } from "../../../redux/slices/CategorySlices/CategoriaSlice";
import { ModalEditarCategoria } from "../modals/ModalCategoria/ModalEditarCategoria";
interface ICategoriaCard {
  categoria: ICategorias[];
  idEmpresa: number;
}

export const CategoriaCard: FC<ICategoriaCard> = ({ categoria, idEmpresa }) => {
  /* Categoria service, traer categoria por id para las subcategoria */
  const dispatch = useAppDispatch();

  const categoriaListActiva = useAppSelector((state) => state.categoria.categoriaActiva);

  const categoriaService = new CategoriaService();

  const getCategorias = async () => {
    const response = await Promise.all(
      categoria.map((e) => categoriaService.getCategoriaById(e.id))
    );
    dispatch(setCategoriaActiva(response));
  };
  useEffect(() => {
    getCategorias();
  }, [categoria, categoriaListActiva]);
  /* --------------------- Cierre Categoria ------------------*/

  const [openCategoryIds, setOpenCategoryIds] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoriaEdit, setCategoriEdit] = useState<ICategorias>();

  const handleCategoryToggle = (id: number) => {
    setOpenCategoryIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((openId) => openId !== id) : [...prevIds, id]
    );
  };
  const handleEditCategory = (categoria: ICategorias) => {
    setOpenModal(true);
    setCategoriEdit(categoria);
  };

  return (
    <>
      {categoriaListActiva
        ? categoriaListActiva.map((categoria, index) => (
            <div className={styles.container_categoria} key={index}>
              <div className={styles.container_categoriaPadre}>
                <h3
                  className={styles.tittle_categoriaPadre}
                  onClick={() => {
                    handleCategoryToggle(categoria.id);
                  }}
                >
                  {categoria.denominacion}
                </h3>
                <div>
                  <span
                    className={`material-symbols-outlined ${styles.span_edit_categoriaPadre}`}
                    onClick={() => handleEditCategory(categoria)}
                  >
                    edit
                  </span>
                  <span
                    className={`material-symbols-outlined ${styles.span_close_categoriaPadre}`}
                    onClick={() => handleCategoryToggle(categoria.id)}
                  >
                    close
                  </span>
                </div>
              </div>
              {categoria.subCategorias === undefined
                ? ""
                : categoria.subCategorias.map((e, index) => (
                    <div
                      className={
                        openCategoryIds.includes(categoria.id)
                          ? styles.container_categoriaHijo
                          : "display_none"
                      }
                      key={index}
                    >
                      <h3 className={styles.tittle_categoriaHijo}>{e.denominacion}</h3>
                      <span
                        className={`material-symbols-outlined ${styles.span_edit_categoriaHijo}`}
                        onClick={() =>
                          handleEditCategory({
                            ...e,
                            sucursales: categoria.sucursales,
                          })
                        }
                      >
                        edit
                      </span>
                    </div>
                  ))}
            </div>
          ))
        : ""}
      {categoriaEdit ? (
        <ModalEditarCategoria
          openModal={openModal}
          setOpenModal={setOpenModal}
          categoriaEdit={categoriaEdit}
          idEmpresa={idEmpresa}
        />
      ) : (
        ""
      )}
    </>
  );
};
