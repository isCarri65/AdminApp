// Importamos el tipo de dato IPersona y la clase BackendClient

import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class SucursalService extends BackendClient<ISucursal> {
  constructor() {
    super("http://190.221.207.224:8090/sucursales");
  }

  async getAllSucursalesByEmpresa(id: number): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}/porEmpresa/${id}`);
    const data = await response.json();
    return data as ISucursal[];
  }

  
}
