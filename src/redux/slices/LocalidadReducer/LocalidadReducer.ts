// src/features/empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocalidad } from '../../../types/ILocalidad';

interface IinitialState{
  localidadesList: ILocalidad[],
  localidadActiva: ILocalidad | null,
}
const initialState: IinitialState = {
  localidadesList: [],
  localidadActiva: null,
}
const LocalidadReducer = createSlice({
  name: 'localidadReducer',
  initialState,
  reducers: {
    setLocalidadesList(state, action:PayloadAction<ILocalidad[]>){
      state.localidadesList = action.payload
    },

    setLocalidadActiva(state, action: PayloadAction<ILocalidad>) {
      state.localidadActiva = action.payload
    },
    removeLocalidadActiva(state){
      state.localidadActiva = null;
    },
  }
});

export const {setLocalidadesList, setLocalidadActiva, removeLocalidadActiva} = LocalidadReducer.actions

export default LocalidadReducer.reducer;
