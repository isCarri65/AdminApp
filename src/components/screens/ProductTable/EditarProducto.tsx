import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { IUpdateProducto } from "../../../types/dtos/productos/IUpdateProducto";
import { ProductService } from "../../../service/ProductoService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

const API_URL: string = import.meta.env.VITE_URL_API;

interface EditarProductoProps {
  show: boolean;
  onHide: () => void;
  producto: IProductos;
  onProductUpdated: () => void;
}

const EditarProducto: React.FC<EditarProductoProps> = ({ show, onHide, producto, onProductUpdated }) => {
  const [formValues, setFormValues] = useState<IUpdateProducto>({
    id: producto.id,
    denominacion: producto.denominacion,
    precioVenta: producto.precioVenta,
    descripcion: producto.descripcion,
    idCategoria: producto.categoria?.id || 0,
    habilitado: producto.habilitado,
    codigo: producto.codigo,
    idAlergenos: producto.alergenos.map((alergeno) => alergeno.id),
    imagenes: producto.imagenes.map((img, index) => ({
      url: img.url,
      name: img.name || `imagen_${index + 1}`, // Asigna un nombre si no existe
    })),
  });

  const [categorias, setCategorias] = useState<ICategorias[]>([]); // Almacenamiento de categorías
  const productService = new ProductService();

  // Obtener las categorías al montar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${API_URL}/categorias`);
        const data: ICategorias[] = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      // Si es checkbox, usar `checked` en lugar de `value`
      setFormValues({
        ...formValues,
        [name]: e.target.checked,
      });
    } else {
      // Para otros tipos de inputs
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (name: keyof IUpdateProducto, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await productService.updateProducto(producto.id, formValues);
      onProductUpdated();
      onHide();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="denominacion"
              value={formValues.denominacion}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precioVenta"
              value={formValues.precioVenta}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="idCategoria"
              value={formValues.idCategoria}
              onChange={handleInputChange}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.denominacion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="habilitado"
              checked={formValues.habilitado}
              label="Habilitado"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imágenes</Form.Label>
            <Form.Control
              type="text"
              name="imagenes"
              value={formValues.imagenes.map((img) => img.url).join(", ")}
              onChange={(e) =>
                handleArrayChange(
                  "imagenes",
                  e.target.value.split(",").map((url, index) => ({
                    url: url.trim(),
                    name: `imagen_${index + 1}`,
                  }))
                )
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarProducto;
