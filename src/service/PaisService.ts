import { IPais } from "../types/IPais";
import { BackendClient } from "./BackendClient";
import { BASEURL } from "./Baseurl";


export class PaisService extends BackendClient<IPais> {
    constructor() {
        super(BASEURL + "/paises");
    }

    // Obtener todos los países
    async getAllPaises(): Promise<IPais[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IPais[];
    }
}
