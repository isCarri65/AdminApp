import {  Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./CompanyFormInputs.module.css";
import { useEffect, useState } from "react";
import { UploadImage } from "../UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setImageStringActivo } from "../../../redux/slices/ImageReducer/ImageReducer";

export const CompanyFormInputs = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const empresaActiva = useAppSelector(
    (state) => state.empresa.empresaActiva
  );
  useEffect(() => {
    if (empresaActiva) {
      if (empresaActiva.logo) {
        setImage(empresaActiva.logo);
        dispatch(setImageStringActivo(empresaActiva.logo))
      }
    }
  }, []);
  useEffect(() =>{
    console.log("Se ingreso una imagen")

  }, [image])
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
            <UploadImage image={image} setImage={setImage} />
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
