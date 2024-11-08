import { IProvincia } from "../types/IProvincia";
import { BackendClient } from "./BackendClient";
import { BASEURL } from "./Baseurl";

export class ProvinciaService extends BackendClient<IProvincia> {
    constructor() {
        super(BASEURL + "/provincias");
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
