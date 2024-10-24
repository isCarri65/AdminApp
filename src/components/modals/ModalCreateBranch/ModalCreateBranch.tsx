import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const ModalCreateBranch = () =>{
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Sucursal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label>Nombre de la Sucursal: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Form.ControlTextarea3"
            >
              <Form.Label>Cuit:</Form.Label>
              <Form.Control type="text" placeholder='Ingresa el cuit'/>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Form.ControlTextarea1"
            >
              <Form.Label>Razon Social:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
