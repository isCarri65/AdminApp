import {  Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./CompanyFormInputs.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setImageStringActivo } from "../../../redux/slices/ImageReducer/ImageReducer";
import { UploadImageCompany } from "../UploadImage/UploadImageCompany";

export const CompanyFormInputs = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const empresaModalActiva = useAppSelector(
    (state) => state.empresa.empresaModalActiva
  );
  useEffect(() => {
    if (empresaModalActiva) {
      if (empresaModalActiva.logo) {
        setImage(empresaModalActiva.logo);
        dispatch(setImageStringActivo(empresaModalActiva.logo))
      }
    }
  }, []);
  return (
    <Form autoComplete="off" className="form-obraAlta">
      <div className="container_Form_Ingredientes">
        <div className={styles.containerInputs}>
          {/* Campos del formulario */}
          <div className={styles.Section1}>
            <TextFieldValue
              label="Nombre:"
              name="nombre"
              type="text"
              placeholder="ej. nombre"
            />
            <TextFieldValue
              label="Razon Social:"
              name="razonSocial"
              type="text"
              placeholder="ej. bar de bebidas"
            />

            <TextFieldValue
              label="Cuit:"
              name="cuit"
              type="text"
              placeholder="ej. cuit"
            />
            <UploadImageCompany image={image} setImage={setImage} />
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
