import { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { NavBarSide } from "../navBarSide/NavBarSide";
import CrearProducto from "./CrearProducto";
import "../ProductTable/ProductTable.css";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ProductService } from "../../../service/ProductoService";
import EditarProducto from "./EditarProducto";
import { useParams } from "react-router-dom";
import { SucursalService } from "../../../service/SurcusalService";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { setSucursalActivo } from "../../../redux/slices/SucursalReducer/SucursalReducer";
import { ModalInfoAdaptable } from "../../ui/modals/ModalInfoAdaptable/ModalInfoAdaptable";

export const ProductTable = () => {
  const { id } = useParams();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  //estado para abrir y cerrar el modal de mostrar informacion de productos
  const [openModalInfo, setOpenModalInfo] = useState(false);
  //estado para guardar  la info de un unico producto
  const [infoProduct, setInfoProducto] = useState<IProductos>();

  const [showModalCrear, setShowModalCrear] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [productos, setProductos] = useState<IProductos[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<IProductos | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();
  const sucursalActiva = useAppSelector((state) => state.sucursal.sucursalActivo);

  const productService = new ProductService();
  const sucursalService = new SucursalService();

  const getSucursalActiva = async () => {
    if (id) {
      await sucursalService.getById(Number.parseInt(id)).then((sucursal) => {
        if (sucursal) {
          dispatch(setSucursalActivo(sucursal));
        } else {
          console.log("No se encontró una sucursal");
        }
      });
    } else {
      console.log("id no encontrado");
    }
  };
  // Función para obtener los productos con paginación
  const fetchProductos = async (page: number) => {
    if (!sucursalActiva) {
      console.warn("Sucursal ID no válido");
      return;
    }
    try {
      const response = await productService.getProductosPorSucursalPaged(
        sucursalActiva.id,
        page,
        5
      ); // 10 productos por página
      setProductos(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getSucursalActiva();
  }, []);
  useEffect(() => {
    fetchProductos(currentPage);
  }, [sucursalActiva]);

  useEffect(() => {
    fetchProductos(currentPage);
  }, [currentPage]);

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

  const handleOpenInfo = (producto: IProductos) => {
    setOpenModalInfo(true);
    setInfoProducto(producto);
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
                <td onClick={() => handleOpenInfo(producto)}>👁️</td>
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
        <Pagination className="pagination">
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
      <div className={openModalInfo ? "openModalInfo" : "closeModalInfo"}>
        {openModalInfo ? (
          <ModalInfoAdaptable<IProductos>
            setOpenModalInfo={setOpenModalInfo}
            objeto={infoProduct}
          />
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </>
  );
};

export default ProductTable;
