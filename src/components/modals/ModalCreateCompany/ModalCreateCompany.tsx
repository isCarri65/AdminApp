import { Field, Formik } from "formik";
import { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import * as Yup from "yup";
import TextFieldValue from "../../ui/TextFieldValue/TextFielValue";

interface IModalCrearEmpresa {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

export const ModalCreateCompany: FC<IModalCrearEmpresa> = ({
  openModal,
  setOpenModal,
}) =>{
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


  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);

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
            <Modal.Title>Crear una Empresa:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              categoria: Yup.string().required("Campo requerido"),
              responsable: Yup.string().required("Campo requerido"),
              telefono: Yup.number().required("Campo requerido"),
              ubicacion: Yup.string().required("Campo requerido"),
            })}
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={async (values: ICreateSucursal) => {
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
                      label="Categoria"
                      name="categoria"
                      type="text"
                      placeholder="Categoria"
                    />

                    <TextFieldValue
                      label="Responsable"
                      name="responsable"
                      type="text"
                      placeholder="Dueño de la empresa / responsable"
                    />
                    <TextFieldValue
                      label="Telefono"
                      name="telefono"
                      type="tel"
                      placeholder="Numero celular"
                    />
                    <TextFieldValue
                      label="Ubicacion:"
                      name="Ubicacion"
                      type="text"
                      placeholder="example 123, barrio, departamento, pais"
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
}
