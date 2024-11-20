import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Select from "react-select"; 
import { v4 as uuidv4 } from 'uuid';
import { ICreateProducto } from '../../../types/dtos/productos/ICreateProducto';
import { ProductService } from '../../../service/ProductoService';
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';
import { CategoriaService } from '../../../service/CategoriaService';
import { useAppSelector } from '../../../Hooks/hooks';
import { AlergenoService } from '../../../service/AlergenoService';
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';

const API_URL: string = import.meta.env.VITE_URL_API;

interface CrearProductoProps {
  show: boolean;
  onHide: () => void;
  onProductCreated: () => Promise<void>;
}

const CrearProducto: React.FC<CrearProductoProps> = ({ show, onHide, onProductCreated }) => {
  const [nombre, setNombre] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const sucursalActiva = useAppSelector((state)=>state.sucursal.sucursalActivo)

  const categoriaService = new CategoriaService()
  const alergenosService = new AlergenoService()
  // Obtener categorías y alérgenos desde el backend

  const getCategorias = async ()=>{
    if(sucursalActiva){
      await categoriaService.getCategoriasPadrePorSucursal(sucursalActiva.id).then((categoriasResponse)=>{
        setCategorias(categoriasResponse)
      })
    }
  }

  const getAlergenos = async ()=>{
    await alergenosService.getAllAlergenos().then((alergenos)=>{
      setAlergenos(alergenos)
    })
  }
  useEffect(() => {
    getCategorias()
    getAlergenos()
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

    const productoData: ICreateProducto = {
      denominacion: nombre,
      precioVenta: parseFloat(precio),
      descripcion: descripcion || '',
      habilitado: true,
      codigo: uuidv4(),
      idCategoria: categoriaSeleccionada,
      idAlergenos: [],
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
              required
              type="text"
              placeholder="Nombre del Producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="categoria" className="mt-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              required
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
              required
              options={opcionesAlergenos}
              isMulti
              onChange={(selectedOptions) => {
                const idsSeleccionados = (selectedOptions || [])
                  .filter((option): option is { value: number; label: string } => Boolean(option)) // Predicado para asegurar que no sea undefined
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
              required
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
            <Form.Control
              type="file"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Crear Producto
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CrearProducto;
