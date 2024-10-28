import { Field, Formik } from "formik";
import { FC } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import * as Yup from "yup";
import TextFieldValue from "../../ui/TextFieldValue/TextFielValue";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { removeSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";
import { IUpdateSucursal } from "../../../types/dtos/sucursal/IUpdateSucursal";
interface IModalCrearSucursal {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  getSucursales: () => void;
}

// Definición del componente ModalPersona
export const ModalCrearSucursal: FC<IModalCrearSucursal> = ({
  openModal,
  setOpenModal,
  getSucursales,
}) => {
  // Valores iniciales para el formulario
  const sucursalService = new SucursalService()
  const initialValues: ICreateSucursal | IUpdateSucursal= {
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    },
    idEmpresa: 0,
    logo: "",
  };
  const sucursalActivo = useAppSelector((state) => state.sucursal.sucursalActivo);
  const dispatch = useAppDispatch();

  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeSucursalActivo());
  };

  return (
    <div>
      {/* Componente Modal de React Bootstrap */}
      <Modal
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* Título del modal dependiendo de si se está editando o añadiendo una persona */}
          {sucursalActivo ? (
            <Modal.Title>Editar una sucursal:</Modal.Title>
          ) : (
            <Modal.Title>Añadir una sucursal:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              horarioApertura: Yup.string().required("Campo requerido"),
              horarioCierre: Yup.string().required("Campo requerido"),
              latitud: Yup.number().required("Campo requerido"),
              longitud: Yup.string().required("Campo requerido"),
              calle: Yup.string().required("Campo requerido"),
              numero: Yup.number().required("Campo requerido"),
              cp: Yup.number().required("Campo requerido"),
              piso: Yup.number().required("Campo requerido"),
              nroDpto: Yup.number().required("Campo requerido"),
              idLocalidad: Yup.number().required("Campo requerido"),
              idEmpresa: Yup.number().required("Campo requerido"),
              logo: Yup.string().required("Campo requerido"),
            })}
            initialValues={ sucursalActivo ? sucursalActivo : initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateSucursal) => {
              // Enviar los datos al servidor al enviar el formulario
              if (sucursalActivo) {
                await sucursalService.put(sucursalActivo?.id, values);
              } else {
                await sucursalService.post(values);
              }
              // Obtener las personas actualizadas y cerrar el modal
              getSucursales();
              handleClose();
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    {/* Campos del formulario */}
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
                      placeholder="00-00-00"
                    />

                    <TextFieldValue
                      label="Horario de cierre:"
                      name="horarioCierre"
                      type="time"
                      placeholder="00-00-00"
                    />
                    <div>
                    <label
                    htmlFor="País: "
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    >Pais:  </label>
                    </div>
                    <Field as="select" name="color">
                      <option value="">Selecciona un color</option>
                      <option value="rojo">Rojo</option>
                      <option value="azul">Azul</option>
                      <option value="verde">Verde</option>
                    </Field>

                    <TextFieldValue
                      label="Pais:"
                      name="pais"
                      type="text"
                      placeholder="Pais"
                    />
                    <TextFieldValue
                      label="Provincia:"
                      name="provincia"
                      type="text"
                      placeholder="Provincia"
                    />
                    <TextFieldValue
                      label="=Localidad:"
                      name="localidad"
                      type="optons"
                      placeholder="Localidad"
                    />
                  </div>
                  {/* Botón para enviar el formulario */}
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
