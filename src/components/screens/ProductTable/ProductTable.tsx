import { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { NavBarSide } from "../navBarSide/NavBarSide";
import CrearProducto from "./CrearProducto";
import "../ProductTable/ProductTable.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ProductService } from "../../../service/ProductoService";
import EditarProducto from "./EditarProducto";

const ProductTable = ({ sucursalId }: { sucursalId: number }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [productos, setProductos] = useState<IProductos[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<IProductos | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const productService = new ProductService();

  // Función para obtener los productos con paginación
  const fetchProductos = async (page: number) => {
    if (!sucursalId) {
      console.warn("Sucursal ID no válido");
      return;
    }
    try {
      const response = await productService.getProductosPorSucursalPaged(sucursalId, page, 10); // 10 productos por página
      setProductos(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Ejecutar fetchProductos cuando cambie el ID de sucursal o la página
  useEffect(() => {
    if (sucursalId) {
      fetchProductos(currentPage);
    }
  }, [sucursalId, currentPage]);

  // Manejo de eventos para el modal
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const handleOpenCrearModal = () => setShowModalCrear(true);
  const handleCloseCrearModal = () => setShowModalCrear(false);
  const handleOpenEditarModal = (producto: IProductos) => {
    setProductoSeleccionado(producto);
    setShowModalEditar(true);
  };
  const handleCloseEditarModal = () => {
    setProductoSeleccionado(null);
    setShowModalEditar(false);
  };

  const handleProductCreated = () => fetchProductos(currentPage); // Refrescar productos después de crear
  const handleProductUpdated = () => fetchProductos(currentPage); // Refrescar productos después de editar

  // Eliminar producto
  const handleDeleteProduct = async (id: number) => {
    try {
      await productService.deleteProductoById(id);
      fetchProductos(currentPage); // Actualizar productos tras la eliminación
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <header className="header_productTable">
        <div className="div_container_navbarProduct">
          <NavBarSide isOpen={isSideBarOpen} toggleMenu={toggleSideBar} />
          <h2 className="title_Product">Productos</h2>
          <Button variant="primary" className="add-product-btn" onClick={handleOpenCrearModal}>
            Agregar Producto
          </Button>
        </div>
      </header>

      <div className={`product-table-container ${isSideBarOpen ? "shifted" : ""}`}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ver</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Habilitado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>👁️</td>
                <td>{producto.denominacion}</td>
                <td>{producto.precioVenta}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.categoria?.denominacion}</td>
                <td>
                  <input type="checkbox" checked={producto.habilitado} readOnly />
                </td>
                <td>
                  <Button variant="warning" onClick={() => handleOpenEditarModal(producto)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(producto.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {showModalCrear && (
        <CrearProducto
          show={showModalCrear}
          onHide={handleCloseCrearModal}
          onProductCreated={handleProductCreated}
        />
      )}

      {showModalEditar && productoSeleccionado && (
        <EditarProducto
          show={showModalEditar}
          onHide={handleCloseEditarModal}
          producto={productoSeleccionado}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </>
  );
};

export default ProductTable;
