import { Button, Table } from "react-bootstrap";
import "../ProductTable/ProductTable.css";
import { NavBarSide } from "../navBarSide/NavBarSide";
import { useState } from "react";

const ProductTable = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const products = [
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    { id: 1, name: "Articulo", price: "$10", description: "Desc", category: "Cat", enabled: true },
    // Agrega más productos o usa Redux para manejar el estado.
  ];

  return (
    <>
      <header className="header_productTable">
        <div className="div_container_navbarProduct">
          <NavBarSide isOpen={isSideBarOpen} toggleMenu={toggleSideBar} />
          <h2 className="title_Product">Productos</h2>
          <Button variant="primary" className="add-product-btn">
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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>👁️</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <input type="checkbox" checked={product.enabled} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductTable;
