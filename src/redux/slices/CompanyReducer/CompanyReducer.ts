import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";


// Define a type for the slice state
interface IinitialState {
  EmpresaList: IEmpresa[]
  EmpresaActivo: IUpdateEmpresaDto | null;
}

// Define the initial state using that type
const initialState: IinitialState = {
  EmpresaList: [],
  EmpresaActivo: null,
}

interface PayloadSetEmpresa {
  Empresa: IUpdateEmpresaDto; 
}


const EmpresaReducer = createSlice({
  name: 'EmpresaReducer',
  initialState,
  reducers: {
    setEmpresaActivo(state, action: PayloadAction<PayloadSetEmpresa>) {
    state.EmpresaActivo = action.payload.Empresa; // Establecemos el elemento activo con el elemento proporcionado en el payload
  },
  // Reducer para eliminar el elemento activo
  removeEmpresaActivo(state) {
    state.EmpresaActivo = null; // Eliminamos el elemento activo estableciéndolo como null
  },
  setEmpresaList(state, action:PayloadAction<IEmpresa[]>){
    state.EmpresaList = action.payload
  }
  },
})

export const { setEmpresaActivo, removeEmpresaActivo, setEmpresaList } = EmpresaReducer.actions


export default EmpresaReducer.reducer