import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ICreateProducto } from '../../../types/dtos/productos/ICreateProducto';
import { ProductService } from '../../../service/ProductoService';
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';
import { CategoriaService } from '../../../service/CategoriaService';
import { useAppSelector } from '../../../Hooks/hooks';
import { AlergenoService } from '../../../service/AlergenoService';
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import { FormControl, FormGroup, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { UploadImage } from '../../ui/UploadImage/UploadImage';
import { IImagen } from '../../../types/IImagen';

interface CrearProductoProps {
  show: boolean;
  onHide: () => void;
  onProductCreated: () => Promise<void>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CrearProducto: React.FC<CrearProductoProps> = ({ show, onHide, onProductCreated }) => {
  const [nombre, setNombre] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [alergenos, setAlergenos] = useState<string[]>([]);
  const [alergenosList, setAlergenosList]= useState<IAlergenos[]>([])
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<IImagen | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const sucursalActiva = useAppSelector((state)=>state.sucursal.sucursalActivo)

  const categoriaService = new CategoriaService()
  const alergenosService = new AlergenoService()
  // Obtener categorías y alérgenos desde el backend

  const getCategorias = async ()=>{
    if(sucursalActiva){
      await categoriaService.getCategoriasPadrePorSucursal(sucursalActiva.id).then((categoriasResponse)=>{
        setCategorias(categoriasResponse)
        console.log(categoriasResponse)
      })
    }
  }

  const getAlergenos = async ()=>{
    await alergenosService.getAllAlergenos().then((alergenos)=>{
      setAlergenosList(alergenos)
    })
  }
  useEffect(() => {
    getCategorias()
    getAlergenos()
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !categoriaSeleccionada || !precio) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    const productoData: ICreateProducto = {
      denominacion: nombre,
      precioVenta: parseFloat(precio),
      descripcion: descripcion,
      habilitado: true,
      codigo: uuidv4(),
      idCategoria: categoriaSeleccionada,
      idAlergenos: alergenos.map((id)=>Number.parseInt(id)),
      imagenes: imagen ? [imagen] : [],
    };

    try {
      const productService = new ProductService();
      const data = await productService.createProducto(productoData);
      console.log(data)
      alert('Producto creado exitosamente.');
      onHide();
      await onProductCreated();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  const handleChangeSelect = ( event: SelectChangeEvent<string[]> )=>{
    const {
      target: { value },
    } = event;
    setAlergenos(
      typeof value === 'string' ? [value.toString()] : value
    );
    console.log(value)
  }
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
              onChange={(e) => {
                setCategoriaSeleccionada(Number(e.target.value))
                console.log(e.target.value)
              }}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.denominacion}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        <FormGroup style={{marginTop: "5px"}}>
        <Form.Label>Alérgenos</Form.Label>
        <FormControl sx={{ m: 1, mt: 1 }}>
        <Select
          multiple
          displayEmpty
          value={alergenos}
          onChange={handleChangeSelect}
          input={<OutlinedInput />}
          style={{height: "40px", width:"100%"}}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Selecciona Alergenos";
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            Selecciona Alergenos
          </MenuItem>
          {alergenosList.map((alergeno) => (
            <MenuItem
              key={alergeno.id}
              value={alergeno.id}
              style={alergenos.includes(alergeno.id) ? {backgroundColor: "#ddd"}:{backgroundColor:"#f8f8f8"}}
            >
              {alergeno.denominacion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </FormGroup >
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
          <UploadImage imageObjeto={imagen} setImageObjeto={setImagen} typeElement='Image'></UploadImage>
          <Button variant="primary" type="submit" className="mt-3">
            Crear Producto
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CrearProducto;
