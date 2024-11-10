import { BackendClient } from "./BackendClient";
import { IProductos } from "../types/dtos/productos/IProductos";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";
const API_URL:string = import.meta.env.VITE_URL_API
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
        const newData = await response.json();
        return newData as IProductos;
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
        return updatedData as IProductos;
    }

    // Obtener un producto por ID
    async getProductoById(id: number): Promise<IProductos> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data as IProductos;
    }

    // Obtener productos por id sucursal
    async getProductosPorSucursal(sucursalId: number): Promise<IProductos[]> {
        const response = await fetch(`${this.baseUrl}/porSucursal/${sucursalId}`);
        const data = await response.json();
        return data as IProductos[];
    }

    // Obtener productos por id sucursal con paginación
    async getProductosPorSucursalPaged(sucursalId: number, page: number, size: number): Promise<IProductos[]> {
        const response = await fetch(`${this.baseUrl}/pagedPorSucursal/${sucursalId}?page=${page}&size=${size}`);
        const data = await response.json();
        return data as IProductos[];
    }

    // Eliminar un producto por ID
    async deleteProductoById(id: number): Promise<void> {
        await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        });
    }

    // Eliminar imagen de un producto
    async deleteImgProducto(id: number, publicId: string): Promise<void> {
        await fetch(`${this.baseUrl}/?id=${id}&publicId=${publicId}`, {
            method: "POST",
        });
    }
}
