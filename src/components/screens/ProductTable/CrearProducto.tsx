import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Select from "react-select"; // Importa React-Select
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar códigos únicos
import noImage from '../../../assets/images/noImage.jpeg';
import { ICreateProducto } from '../../../types/dtos/productos/ICreateProducto';
import { ProductService } from '../../../service/ProductoService';
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';

const API_URL: string = import.meta.env.VITE_URL_API;

interface CrearProductoProps {
  show: boolean;
  onHide: () => void;
  onProductCreated: () => Promise<void>;
}

const CrearProducto: React.FC<CrearProductoProps> = ({ show, onHide, onProductCreated }) => {
  const [nombre, setNombre] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [alergenos, setAlergenos] = useState<number[]>([]);
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [alergenosLista, setAlergenosLista] = useState<{ id: number; nombre: string }[]>([]);

  // Obtener categorías y alérgenos desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_URL}/categorias`);
        const data: ICategorias[] = await response.json();
        const categoriasTransformadas = data.map((cat) => ({
          id: cat.id,
          nombre: cat.denominacion,
        }));
        setCategorias(categoriasTransformadas);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    const fetchAlergenos = async () => {
      try {
        const response = await fetch(`${API_URL}/alergenos`);
        const data: { id: number; nombre: string }[] = await response.json();
        setAlergenosLista(data);
      } catch (error) {
        console.error('Error al obtener los alérgenos:', error);
      }
    };

    fetchCategorias();
    fetchAlergenos();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !categoriaSeleccionada || !precio) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Generar datos para el producto
    const productoData: ICreateProducto = {
      denominacion: nombre,
      precioVenta: parseFloat(precio),
      descripcion: descripcion || '',
      habilitado: true,
      codigo: uuidv4(), // Generar un código único
      idCategoria: categoriaSeleccionada,
      idAlergenos: alergenos,
      imagenes: imagen ? [{ url: URL.createObjectURL(imagen), name: imagen.name }] : [],
    };

    try {
      const productService = new ProductService();
      await productService.createProducto(productoData);
      alert('Producto creado exitosamente.');
      onHide();
      await onProductCreated();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  // Transformar alérgenos para React-Select
  const opcionesAlergenos = alergenosLista.map((alergeno) => ({
    value: alergeno.id,
    label: alergeno.nombre,
  }));

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear / Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="crear-producto-form" onSubmit={handleSubmit}>
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
            <Form.Select
              value={categoriaSeleccionada || ''}
              onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="alergenos" className="mt-3">
            <Form.Label>Alérgenos</Form.Label>
            <Select
              options={opcionesAlergenos}
              isMulti
              onChange={(selectedOptions) => {
                const idsSeleccionados = (selectedOptions || [])
                  .filter(Boolean) // Filtra valores undefined o null
                  .map((option) => option.value);
                setAlergenos(idsSeleccionados);
              }}
              value={alergenos.map((id) => opcionesAlergenos.find((op) => op.value === id))}
              placeholder="Seleccione alérgenos"
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
        <Button variant="primary" type="submit" form="crear-producto-form">
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CrearProducto;
