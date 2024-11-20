import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

// Define a type for the slice state
interface IinitialState {
  sucursalList: ISucursal[]
  sucursalActivo: ISucursal | null;
}

// Define the initial state using that type
const initialState: IinitialState = {
  sucursalList: [],
  sucursalActivo: null,
}


const SucursalReducer = createSlice({
  name: 'sucursalReducer',
  initialState,
  reducers: {
    setSucursalActivo(state, action: PayloadAction<ISucursal>) {
    state.sucursalActivo = action.payload; // Establecemos el elemento activo con el elemento proporcionado en el payload
  },
  // Reducer para eliminar el elemento activo
  removeSucursalActivo(state) {
    state.sucursalActivo = null; // Eliminamos el elemento activo estableciéndolo como null
  },
  setSucursalList(state, action: PayloadAction<ISucursal[]>){
    state.sucursalList = action.payload
  }
  },
})

export const { setSucursalActivo, removeSucursalActivo, setSucursalList } = SucursalReducer.actions


export default SucursalReducer.reducer