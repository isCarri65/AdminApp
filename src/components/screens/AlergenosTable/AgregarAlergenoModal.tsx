import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ICreateAlergeno } from "../../../types/dtos/alergenos/ICreateAlergeno";
import { AlergenoService } from "../../../service/AlergenoService";

interface AgregarAlergenoModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddAlergeno: (newAlergeno: ICreateAlergeno) => void;
}

const AgregarAlergenoModal: React.FC<AgregarAlergenoModalProps> = ({
  show,
  handleClose,
  handleAddAlergeno,
}) => {
  const [newAlergenoNombre, setNewAlergenoNombre] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const alergenosService = new AlergenoService();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto (recarga de la página)

    const newAlergeno: ICreateAlergeno = {
      denominacion: newAlergenoNombre,
      imagen: null, // Puedes agregar la lógica para la imagen si es necesario
    };

    setLoading(true);
    setError(null);

    try {
      const addedAlergeno = await alergenosService.createAlergeno(newAlergeno);
      handleAddAlergeno(addedAlergeno); // Añade el alérgeno a la lista
      handleClose(); // Cierra el modal después de agregar el alérgeno
    } catch (err) {
      setError("Error al agregar el alérgeno. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Alergeno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}> {/* Se añadió onSubmit aquí */}
          <Form.Group controlId="formAlergenoNombre">
            <Form.Label>Nombre del Alérgeno</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del alérgeno"
              value={newAlergenoNombre}
              onChange={(e) => setNewAlergenoNombre(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Agregando..." : "Agregar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarAlergenoModal;
