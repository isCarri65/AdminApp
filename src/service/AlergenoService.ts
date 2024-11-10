import { BackendClient } from "./BackendClient";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BASEURL } from "./Baseurl";

export class AlergenoService extends BackendClient<IAlergenos> {
    constructor() {
      super(BASEURL + "/alergenos");
    }
  
    // Obtener todos los alergenos
    async getAllAlergenos(): Promise<IAlergenos[]> {
      const response = await fetch(`${this.baseUrl}`);
      const data = await response.json();
      return data as IAlergenos[];
    }
  
    // Obtener un alergeno por ID
    async getAlergenoById(id: number): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const data = await response.json();
      return data as IAlergenos;
    }
  
    // Crear un nuevo alergeno
    async createAlergeno(data: ICreateAlergeno): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as IAlergenos;
    }
  
    // Editar un alergeno existente
    async updateAlergeno(id: number, data: IUpdateAlergeno): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      return updatedData as IAlergenos;
    }
  
    // Eliminar un alergeno por ID
    async deleteAlergenoById(id: number): Promise<void> {
      await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
    }
  
    // Eliminar imagen de un alergeno
    async deleteImgAlergeno(id: number, publicId: string): Promise<void> {
      await fetch(`${this.baseUrl}/?id=${id}&publicId=${publicId}`, {
        method: "POST",
      });
    }
  }