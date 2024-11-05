import { IPais } from "../types/IPais";
import { BackendClient } from "./BackendClient";


export class PaisService extends BackendClient<IPais> {
    constructor() {
        super("http://190.221.207.224:8090/paises");
    }

    // Obtener todos los países
    async getAllPaises(): Promise<IPais[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IPais[];
    }
}
