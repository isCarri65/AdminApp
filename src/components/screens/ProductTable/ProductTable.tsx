
import { Button, Table } from 'react-bootstrap';
import "../ProductTable/ProductTable.css";

const ProductTable = () => {
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
        <div className="product-table-container">
            <h2>Productos</h2>
            <Button variant="primary" className="add-product-btn">Agregar Producto</Button>
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
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>👁️</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td><input type="checkbox" checked={product.enabled} readOnly /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductTable;
