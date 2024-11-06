import { ILocalidad } from "../types/ILocalidad";
import { BackendClient } from "./BackendClient";


export class LocalidadesService extends BackendClient<ILocalidad> {
    constructor() {
        super("http://190.221.207.224:8090/localidades");
    }

    // Obtener localidades por ID de provincia
    async getLocalidadesByProvincia(provinciaId: number): Promise<ILocalidad[]> {
        const response = await fetch(`${this.baseUrl}/findByProvincia/${provinciaId}`);
        const data = await response.json();
        return data as ILocalidad[];
    }
}
