import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { BackendClient } from "./BackendClient";


export class EmpresaService extends BackendClient<IEmpresa> {
  constructor() {
    super("http://190.221.207.224:8090/empresas");
  }

  // Obtener todas las empresas
  async getAllEmpresas(): Promise<IEmpresa[]> {
    const response = await fetch(`${this.baseUrl}/`);
    const data = await response.json();
    return data as IEmpresa[];
  }

  // Crear Empresa
  async createEmpresa(data: IEmpresa): Promise<IEmpresa> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as IEmpresa;
  }

  // Editar Empresa
  async updateEmpresa(idEmpresa: number, data: IEmpresa): Promise<IEmpresa> {
    const response = await fetch(`${this.baseUrl}/${idEmpresa}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updatedData = await response.json();
    return updatedData as IEmpresa;
  }

}
