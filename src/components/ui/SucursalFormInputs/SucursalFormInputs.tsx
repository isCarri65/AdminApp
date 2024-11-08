import { Field, FieldInputProps, FieldMetaProps, Form } from "formik";
import TextFieldValue from "../TextFieldValue/TextFielValue";
import { Button } from "react-bootstrap";
import styles from "./SucursalFormInputs.module.css";
import { ChangeEvent , useEffect, useState } from "react";
import { UploadImage } from "../UploadImage/UploadImage";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setImageStringActivo } from "../../../redux/slices/ImageReducer/ImageReducer";
import { PaisService } from "../../../service/PaisService";
import { ProvinciaService } from "../../../service/ProvinciaService";
import { LocalidadesService } from "../../../service/LocalidadService";
import { IPais } from "../../../types/IPais";
import { IProvincia } from "../../../types/IProvincia";
import { ILocalidad } from "../../../types/ILocalidad";


export const SucursalFormInputs = () => {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const sucursalActivo = useAppSelector(
    (state) => state.sucursal.sucursalActivo
  );
  const paisService = new PaisService();
  const provinciaService = new ProvinciaService();
  const localidadService = new LocalidadesService();

  const [paisesList, setPaises] = useState<IPais[]>([]);
  const [provinciasList, setProvincias] = useState<IProvincia[]>([]);
  const [localidadesList, setLocalidades] = useState<ILocalidad[]>([]);
  const [paisActivo, setPaisActivo] = useState<IPais | null>(null);
  const [provinciaActiva, setProvinciaActiva] = useState<IProvincia | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPr, setIsFocusedPr] = useState(false);
  const [isFocusedL, setIsFocusedL] = useState(false);

  const getPaises = async () => {
    await paisService.getAllPaises().then((paises) => {
      setPaises(paises);
    });
  };
  const getProvincias = async () => {
    await provinciaService.getAllProvincias().then((provincias) => {
      setProvincias(provincias);
      console.log(provincias);
    });
  };
  const getLocalidades = async () => {
    await localidadService
      .getAll()
      .then((localidades) => setLocalidades(localidades));
  };
  const filterProvincias = (pais: IPais) => {
    return provinciasList.filter((provincia) => (provincia.pais.id === pais.id));
  };

  const filterLocalidades = (provincia: IProvincia)=> {
    return localidadesList.filter((localidad)=> localidad.provincia.id === provincia.id )
  }

  useEffect(() => {
    if (sucursalActivo) {
      if (sucursalActivo.logo) {
        setImage(sucursalActivo.logo);
        dispatch(setImageStringActivo(sucursalActivo.logo));
      }
      setPaisActivo(sucursalActivo.domicilio.localidad.provincia.pais)
      setProvinciaActiva(sucursalActivo.domicilio.localidad.provincia)
    }
    getPaises();
    getProvincias();
    getLocalidades();
  }, []);

  useEffect(() => {
    console.log("Se ingreso una imagen");
  }, [image]);

  const handlePaisActivo = (event: ChangeEvent<HTMLSelectElement>, onChange: (e: ChangeEvent<any>) => void)=>{
    onChange(event);
    const id = event.target.value;
    const paisFinded = paisesList.find((pais)=> pais.id === Number.parseInt(id))
    if(paisFinded) {
      setPaisActivo(paisFinded)
      setProvinciaActiva(null)
    } else {
      console.log("Pais no encontrado")
    }
  }
  const handleProvinciaActiva = (event: ChangeEvent<HTMLSelectElement>, onChange: (e: ChangeEvent<any>) => void) =>{
    onChange(event)
    const id = event.target.value
    const provinciaFinded = provinciasList.find((provincia)=> provincia.id === Number.parseInt(id) )
    if(provinciaFinded){
      setProvinciaActiva(provinciaFinded)
    } else{
      console.log("Provincia no encontrada")
    }
  }

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
              <Field as="select" name="pais">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <div>
                    <select
                      {...field}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className={styles.customSelect}
                      onChange={(e)=>handlePaisActivo(e, field.onChange)}
                    >
                      <option value="" disabled>
                        Selecciona un Pais
                      </option>
                      {sucursalActivo && 
                      <option value={sucursalActivo.domicilio.localidad.provincia.pais.id}>{sucursalActivo.domicilio.localidad.provincia.pais.nombre}</option>}
                      
                      {paisesList.map((pais) => (
                        <option
                          value={pais.id}
                          key={pais.id}
                        >
                          {pais.nombre}
                        </option>
                      ))}
                    </select>
                    {meta.touched && meta.error ? (
                      <div className="error">{meta.error}</div>
                    ) : null}
                  </div>
                )}
              </Field>
              <i
                className={`fas fa-chevron-down ${
                  styles.icon + " " + (isFocused ? "" : styles.open)
                } `}
              ></i>
            </div>

            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Provincia:
              </label>
              <Field
                as="select"
                name="provincia"
                placeholder="Selecciona una Provincia"
              >
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <div>
                    <select
                      disabled={paisActivo ? false : true}
                      {...field}
                      onFocus={() => setIsFocusedPr(true)}
                      onBlur={() => setIsFocusedPr(false)}
                      className={`
                        ${styles.customSelect} 
                        ${paisActivo ? "" : styles.disabledInput}
                      `}
                      onChange={ (e)=> handleProvinciaActiva(e, field.onChange)}

                    >
                      <option value="" disabled>
                        Selecciona una Provincia
                      </option>
                      {sucursalActivo && 
                      <option value={sucursalActivo.domicilio.localidad.provincia.id}>{sucursalActivo.domicilio.localidad.provincia.nombre}</option>}
                      {paisActivo &&
                        filterProvincias(paisActivo).map((provincia) => (
                          <option value={provincia.id} key={provincia.id}>{provincia.nombre}</option>
                        ))
                      }
                    </select>
                    {meta.touched && meta.error ? (
                      <div className="error">{meta.error}</div>
                    ) : null}
                  </div>
                )}
              </Field>

              <i
                className={`fas fa-chevron-down ${
                  styles.icon + " " + (isFocusedPr ? "" : styles.open)
                } `}
              ></i>
            </div>

            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="pais">
                Localidad:
              </label>
              <Field as="select" name="localidad">
                {({
                  field,
                  meta,
                }: {
                  field: FieldInputProps<string>;
                  meta: FieldMetaProps<string>;
                }) => (
                  <div>
                    <select
                      {...field}
                      onFocus={() => setIsFocusedL(true)}
                      onBlur={() => setIsFocusedL(false)}
                      disabled={provinciaActiva? false : true}
                      className={
                        styles.customSelect +
                        " " +
                        (provinciaActiva ? "" : styles.disabledInput)
                      }
                    >
                      <option value="" disabled>
                        Selecciona una Localidad
                      </option>
                      {sucursalActivo && 
                      <option value={sucursalActivo.domicilio.localidad.id}>{sucursalActivo.domicilio.localidad.nombre}</option>}
                      
                      {provinciaActiva && filterLocalidades(provinciaActiva).map((localidad) => (
                        <option value={localidad.id} key={localidad.id}>{localidad.nombre}</option>
                      ))}
                    </select>
                    {meta.touched && meta.error ? (
                      <div className="error">{meta.error}</div>
                    ) : null}
                  </div>
                )}
              </Field>

              <i
                className={`fas fa-chevron-down ${
                  styles.icon + " " + (isFocusedL ? "" : styles.open)
                } `}
              ></i>
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
