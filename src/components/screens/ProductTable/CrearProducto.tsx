// CrearProducto.tsx
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import noImage from '../../../assets/images/noImage.jpeg';

interface CrearProductoProps {
  show: boolean;
  onHide: () => void;
}

const CrearProducto: React.FC<CrearProductoProps> = ({ show, onHide }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [alergenos, setAlergenos] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear / Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="categoria" className="mt-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="alergenos" className="mt-3">
            <Form.Label>Alergenos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Alergenos"
              value={alergenos}
              onChange={(e) => setAlergenos(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="precio" className="mt-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="descripcion" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="imagen" className="mt-3">
            <Form.Label>Imagen</Form.Label>
            <div className="image-upload">
              <input type="file" onChange={handleImageChange} />
              {imagen ? (
                <img src={URL.createObjectURL(imagen)} alt="Preview" className="preview-image" />
              ) : (
                <img src={noImage} alt="No image" className="preview-image" />
              )}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Volver
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearProducto;
