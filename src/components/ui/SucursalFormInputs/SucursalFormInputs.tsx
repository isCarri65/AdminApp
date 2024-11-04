import { Field, Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./SucursalFormInputs.module.css";
import { useState } from "react";
import { UploadImage } from "../UploadImage/UploadImage";

export const SucursalFormInputs = () => {
  const [image, setImage] = useState<string | null>(null);
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
                <option value="">Selecciona un pais</option>
                <option value="1">Argentina</option>
                <option value="2">Peru</option>
              </Field>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Provincia:
              </label>
              <Field as="select" name="provincia" className={styles.customSelect}>
                <option value="">Selecciona una provincia</option>
                <option value="1">Argentina</option>
                <option value="2">Peru</option>
              </Field>
            </div>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Localidad:
              </label>
              <Field as="select" name="localidad" className={styles.customSelect}>
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
        <Button variant="success" type="submit">
          Enviar
        </Button>
      </div>
    </Form>
  );
};
