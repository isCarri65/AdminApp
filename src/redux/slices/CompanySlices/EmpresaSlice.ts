// src/features/empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';

interface IinitialState{
  empresasList: IEmpresa[],
  empresaActiva: IEmpresa | null,
}
const initialState: IinitialState = {
  empresasList: [],
  empresaActiva: null,
}
const EmpresaSlice = createSlice({
  name: 'empresaSlice',
  initialState,
  reducers: {
    setEmpresaList(state, action:PayloadAction<IEmpresa[]>){
      state.empresasList = action.payload
    },

    setEmpresaActiva(state, action: PayloadAction<IEmpresa>) {
      state.empresaActiva = action.payload
    },
    removeEmpresaActiva(state){
      state.empresaActiva = null;
    }
  }
});

export const {setEmpresaList, setEmpresaActiva, removeEmpresaActiva} = EmpresaSlice.actions

export default EmpresaSlice.reducer;