import { IProvincia } from "../types/IProvincia";
import { BackendClient } from "./BackendClient";

export class ProvinciaService extends BackendClient<IProvincia> {
    constructor() {
        super("http://190.221.207.224:8090/provincias");
    }

    // Obtener provincias por ID de país
    async getProvinciaByPais(paisId: number): Promise<IProvincia[]> {
        const response = await fetch(`${this.baseUrl}/findByPais/${paisId}`);
        const data = await response.json();
        return data as IProvincia[];
    }
    async getAllProvincias(): Promise<IProvincia[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IProvincia[];
      }
}
