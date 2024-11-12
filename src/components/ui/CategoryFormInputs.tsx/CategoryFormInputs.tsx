import { Form, useFormikContext } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./CategoryFormInputs.module.css";
import { FC, useEffect } from "react";
import { setCategoriaActiva } from "../../../redux/slices/CategorySlices/CategoriaSlice";
import { CategoriaService } from "../../../service/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

interface IModalCreateCompany {
  idSucursales: number[];
  categoriasAll: ICategorias[];
}

export const CategoryFormInputs: FC<IModalCreateCompany> = ({ categoriasAll, idSucursales }) => {
  /* Categoria service, traer categoria por id para las subcategoria */
  const dispatch = useAppDispatch();

  const categoriaListActiva = useAppSelector((state) => state.categoria.categoriaActiva);

  const categoriaService = new CategoriaService();

  const getCategorias = async () => {
    const response = await Promise.all(
      categoriasAll.map((e) => categoriaService.getCategoriaById(e.id))
    );
    dispatch(setCategoriaActiva(response));
  };
  useEffect(() => {
    getCategorias();
  }, [categoriasAll]);
  /* --------------------- Cierre Categoria ------------------*/

  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    setFieldValue("idSucursales", idSucursales);
  }, [idSucursales, setFieldValue]);
  return (
    <Form autoComplete="off" className="form-obraAlta">
      <div className="container_Form_Ingredientes">
        <div className={styles.containerInputs}>
          {/* Campos del formulario */}
          <div className={styles.Section1}>
            <TextFieldValue
              label="Denominacion:"
              name="denominacion"
              type="text"
              placeholder="ej. denominacion"
            />
            <label htmlFor="idCategoriaPadre">Categoria Padre:</label>
            <select
              name="idCategoriaPadre"
              id="idCategoriaPadre"
              onChange={(e) =>
                setFieldValue("idCategoriaPadre", e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Es Una Categoria Padre</option>
              {categoriasAll.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Botón para enviar el formulario */}
      <div className="d-flex justify-content-end">
        <Button className={styles.buttonSubmit} variant="success" type="submit">
          Enviar
        </Button>
      </div>
    </Form>
  );
};
