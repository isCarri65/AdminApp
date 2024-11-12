// src/features/empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa';

interface IinitialState{
  empresaList: IEmpresa[],
  empresaActiva: IEmpresa | null,
  empresaModalActiva: IEmpresa | null,
}
const initialState: IinitialState = {
  empresaList: [],
  empresaActiva: null,
  empresaModalActiva: null,
}
const EmpresaSlice = createSlice({
  name: 'empresaSlice',
  initialState,
  reducers: {
    setEmpresaList(state, action:PayloadAction<IEmpresa[]>){
      state.empresaList = action.payload
    },

    setEmpresaActiva(state, action: PayloadAction<IEmpresa>) {
      state.empresaActiva = action.payload
    },
    removeEmpresaActiva(state){
      state.empresaActiva = null;
    },
    setEmpresaModalActiva(state, action: PayloadAction<IEmpresa>) {
      state.empresaModalActiva = action.payload
    },
    removeEmpresaModalActiva(state){
      state.empresaModalActiva = null;
    }
  }
});

export const {setEmpresaList, setEmpresaActiva, removeEmpresaActiva, setEmpresaModalActiva, removeEmpresaModalActiva} = EmpresaSlice.actions

export default EmpresaSlice.reducer;
