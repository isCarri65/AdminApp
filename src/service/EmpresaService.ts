import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { BackendClient } from "./BackendClient";


export class EmpresaService extends BackendClient<IEmpresa> {
  constructor() {
    super("http://localhost:8090/empresas");
  }

  // Obtener todas las empresas
  async getAllEmpresas(): Promise<IEmpresa[]> {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as IEmpresa[];
  }

  // Crear Empresa
  async createEmpresa(data: ICreateEmpresaDto): Promise<IEmpresa> {
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
  async updateEmpresa(idEmpresa: number, data: IUpdateEmpresaDto): Promise<IEmpresa> {
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
