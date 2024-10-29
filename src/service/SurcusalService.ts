// Importamos el tipo de dato IPersona y la clase BackendClient

import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class SucursalService extends BackendClient<ISucursal> {}
