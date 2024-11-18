// src/features/empresaSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPais } from '../../../types/IPais';

interface IinitialState{
  paisesList: IPais[],
  paisActivo: IPais | null,
}
const initialState: IinitialState = {
  paisesList: [],
  paisActivo: null,
}
const PaisReducer = createSlice({
  name: 'paisReducer',
  initialState,
  reducers: {
    setPaisesList(state, action:PayloadAction<IPais[]>){
      state.paisesList = action.payload
    },

    setPaisActivo(state, action: PayloadAction<IPais>) {
      state.paisActivo = action.payload
    },
    removePaisActivo(state){
      state.paisActivo = null;
    },
  }
});

export const {setPaisesList, setPaisActivo, removePaisActivo} = PaisReducer.actions

export default PaisReducer.reducer;
