import { BackendClient } from "./BackendClient";
import { IProductos } from "../types/dtos/productos/IProductos";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
import { IPaginatedResponse } from "../types/dtos/productos/IPaginatedResponse";

const API_URL: string = import.meta.env.VITE_URL_API;

export class ProductService extends BackendClient<IProductos> {
    constructor() {
        super(API_URL + "/articulos");
    }

    // Crear producto
    async createProducto(data: ICreateProducto): Promise<IProductos> {
        const response = await fetch(`${this.baseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("Error en la API:", responseData);
            throw new Error(`Error al crear producto: ${responseData.message || response.statusText}`);
        }

        console.log("Producto creado en la API:", responseData);
        return responseData as IProductos;
    }

    // Actualizar producto
    async updateProducto(id: number, data: IUpdateProducto): Promise<IProductos> {
        const response = await fetch(`${this.baseUrl}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const updatedData = await response.json();

        if (!response.ok) {
            console.error("Error al actualizar producto:", updatedData);
            throw new Error(`Error al actualizar producto: ${updatedData.message || response.statusText}`);
        }

        return updatedData as IProductos;
    }

    // Obtener un producto por ID
    async getProductoById(id: number): Promise<IProductos> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (!response.ok) {
            throw new Error(`Error al obtener producto: ${response.statusText}`);
        }

        const data = await response.json();
        return data as IProductos;
    }

    // Obtener productos por ID sucursal
    async getProductosPorSucursal(sucursalId: number): Promise<IProductos[]> {
        const response = await fetch(`${this.baseUrl}/porSucursal/${sucursalId}`);

        if (!response.ok) {
            throw new Error(`Error al obtener productos por sucursal: ${response.statusText}`);
        }

        const data = await response.json();
        return data as IProductos[];
    }

    // Obtener productos por ID sucursal con paginación
    async getProductosPorSucursalPaged(
        sucursalId: number,
        page: number,
        size: number
    ): Promise<IPaginatedResponse<IProductos>> {
        const response = await fetch(
            `${this.baseUrl}/pagedPorSucursal/${sucursalId}?page=${page}&size=${size}`
        );
        if (!response.ok) {
            throw new Error(`Error al obtener productos con paginación: ${response.statusText}`);
        }

        const data = await response.json();
        return data as IPaginatedResponse<IProductos>;
    }

    // Eliminar un producto por ID
    async deleteProductoById(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar producto: ${response.statusText}`);
        }
    }

    // Eliminar imagen de un producto
    async deleteImgProducto(id: number, publicId: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/?id=${id}&publicId=${publicId}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar imagen: ${response.statusText}`);
        }
    }
}
