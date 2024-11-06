import { Field, Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./SucursalFormInputs.module.css";
import { useEffect, useState } from "react";
import { UploadImage } from "../UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setImageStringActivo } from "../../../redux/slices/ImageReducer/ImageReducer";

export const SucursalFormInputs = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useAppDispatch()
  const sucursalActivo = useAppSelector(
    (state) => state.sucursal.sucursalActivo
  );
const paisesServices = Paises

  useEffect(() => {
    if (sucursalActivo) {
      if (sucursalActivo.logo) {
        setImage(sucursalActivo.logo);
        dispatch(setImageStringActivo(sucursalActivo.logo))
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
              placeholder="ej. Asus"
            />
            <TextFieldValue
              label="Horario de apertura:"
              name="horarioApertura"
              type="time"
              placeholder="00-00"
            />

            <TextFieldValue
              label="Horario de cierre:"
              name="horarioCierre"
              type="time"
              placeholder="00-00"
            />
            <TextFieldValue
              label="Latitud:"
              name="latitud"
              type="number"
              placeholder="ej. 1111"
            />
            <TextFieldValue
              label="Longitud:"
              name="longitud"
              type="number"
              placeholder=""
            />
          </div>
          <div className={styles.Section2}>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Pais:
              </label>
              <Field as="select" name="pais" className={styles.customSelect}>
                {}
              </Field>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Provincia:
              </label>
              <Field
                as="select"
                name="provincia"
                className={styles.customSelect}
              >
                <option value="">Selecciona una provincia</option>
                <option value="1">Argentina</option>
                <option value="2">Peru</option>
              </Field>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Localidad:
              </label>
              <Field
                as="select"
                name="localidad"
                className={styles.customSelect}
              >
                <option value="">Selecciona una localidad</option>
                <option value="1">Argentina</option>
                <option value="2">Peru</option>
              </Field>
            </div>
            <TextFieldValue
              label="Calle:"
              name="calle"
              type="string"
              placeholder="ej. calle nueva"
            />
            <TextFieldValue
              label="Nro de calle:"
              name="numero"
              type="number"
              placeholder="1111"
            />
          </div>
          <div className={styles.Section3}>
            <TextFieldValue
              label="Código Póstal:"
              name="cp"
              type="number"
              placeholder=""
            />
            <TextFieldValue
              label="Piso:"
              name="piso"
              type="number"
              placeholder=""
            />
            <TextFieldValue
              label="Nro departamento"
              name="nroDpto"
              type="number"
              placeholder=""
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
