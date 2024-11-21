// src/features/empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProvincia } from '../../../types/IProvincia';

interface IinitialState{
  provinciasList: IProvincia[],
  provinciaActiva: IProvincia | null,
}
const initialState: IinitialState = {
  provinciasList: [],
  provinciaActiva: null,
}
const ProvinciaReducer = createSlice({
  name: 'provinciaReducer',
  initialState,
  reducers: {
    setProvinciasList(state, action:PayloadAction<IProvincia[]>){
      state.provinciasList = action.payload
    },

    setProvinciaActiva(state, action: PayloadAction<IProvincia>) {
      state.provinciaActiva = action.payload
    },
    removeProvinciaActiva(state){
      state.provinciaActiva = null;
    },
  }
});

export const {setProvinciasList, setProvinciaActiva, removeProvinciaActiva} = ProvinciaReducer.actions

export default ProvinciaReducer.reducer;
