import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IUpdateAlergeno } from "../../../types/dtos/alergenos/IUpdateAlergeno";
import { AlergenoService } from "../../../service/AlergenoService";

interface EditarAlergenoModalProps {
  show: boolean;
  handleClose: () => void;
  alergenoId: number;
  handleUpdateAlergeno: (id: number, data: IUpdateAlergeno) => void;
}

const EditarAlergenoModal: React.FC<EditarAlergenoModalProps> = ({ show, handleClose, alergenoId, handleUpdateAlergeno }) => {
  const [denominacion, setDenominacion] = useState("");
  
  const alergenoService = new AlergenoService();

  useEffect(() => {
    const fetchAlergeno = async () => {
      const alergeno = await alergenoService.getAlergenoById(alergenoId);
      setDenominacion(alergeno.denominacion);
    };
    
    if (alergenoId) {
      fetchAlergeno();
    }
  }, [alergenoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAlergeno: IUpdateAlergeno = { 
      denominacion, 
      imagen: null,  // Asignamos null a imagen
      id: alergenoId  // Asignamos el id del alérgeno a editar
    };
    handleUpdateAlergeno(alergenoId, updatedAlergeno);
    handleClose(); // Cerrar modal después de guardar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Alergeno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="denominacion">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)} 
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditarAlergenoModal;
