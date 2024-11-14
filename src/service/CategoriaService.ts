import { BackendClient } from "./BackendClient";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
const API_URL: string = import.meta.env.VITE_URL_API;

export class CategoriaService extends BackendClient<ICategorias> {
  constructor() {
    super(API_URL + "/categorias");
  }

  // Crear categoría
  async createCategoria(data: ICreateCategoria): Promise<ICategorias> {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as ICategorias;
  }

  // Editar categoría
  async updateCategoria(id: number, data: IUpdateCategoria): Promise<ICategorias> {
    console.log(data, "UPDATEEEE");
    const response = await fetch(`${this.baseUrl}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response, "----------------------------------------------");
    const updatedData = await response.json();
    console.log(updatedData, "----------------------------------------------");

    return updatedData as ICategorias;
  }

  // Obtener categorías por id sucursal
  async getCategoriasPorSucursal(sucursalId: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseUrl}/allCategoriasPorSucursal/${sucursalId}`);
    const data = await response.json();
    return data as ICategorias[];
  }

  // Obtener una categoría por ID
  async getCategoriaById(id: number): Promise<ICategorias> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const data = await response.json();
    return data as ICategorias;
  }

  // Obtener categorías por id empresa
  async getCategoriasPorEmpresa(empresaId: number): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseUrl}/allCategoriasPorEmpresa/${empresaId}`);
    const data = await response.json();
    return data as ICategorias[];
  }
}
