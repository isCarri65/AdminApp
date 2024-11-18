import { Field, Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./CategoryFormInputs.module.css";
import { FC } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

interface IModalCreateCompany {
  idSucursales: ISucursal[];
  idEmpresa: number;
}

export const CategoryFormInputsEditar: FC<IModalCreateCompany> = ({ idSucursales, idEmpresa }) => {
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
            <Field type="hidden" name="idSucursales" value={idSucursales} />
            <Field type="hidden" name="idEmpresa" value={idEmpresa} />
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
