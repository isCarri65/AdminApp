// Importamos el tipo de dato ISucursal y la clase BackendClient

import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { BackendClient } from "./BackendClient";

// Clase SucursalService que extiende BackendClient para interactuar con la API de sucursales
export class SucursalService extends BackendClient<ISucursal> {
  constructor() {
    super("http://190.221.207.224:8090/sucursales");
  }

  // Obtener todas las sucursales de una empresa
  async getAllSucursalesByEmpresa(idEmpresa: number): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`);
    const data = await response.json();
    return data as ISucursal[];
  }

  // Verificar si existe la casa matriz para una empresa
  async existsCasaMatriz(idEmpresa: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/existCasaMatriz/${idEmpresa}`);
    const data = await response.json();
    return data as boolean;
  }

  // Crear Sucursal
  async createSucursal(data: ISucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as ISucursal;
  }

  // Editar Sucursal
  async updateSucursal(idSucursal: number, data: ISucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/update/${idSucursal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    return updatedData as ISucursal;
  }

}
