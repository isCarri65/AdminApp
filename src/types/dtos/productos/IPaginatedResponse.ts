//import { IProductos } from "./IProductos";

export interface IPaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Página actual
}
