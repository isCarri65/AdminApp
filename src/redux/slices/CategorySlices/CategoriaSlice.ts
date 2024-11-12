import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

interface IinitialState {
  categoriaList: ICategorias[];
  categoriaActiva: ICategorias[] | null;
}
const initialState: IinitialState = {
  categoriaList: [],
  categoriaActiva: null,
};
const CategoriaSlice = createSlice({
  name: "categoriaSlice",
  initialState,
  reducers: {
    setCategoriaList(state, action: PayloadAction<ICategorias[]>) {
      state.categoriaList = action.payload;
    },

    setCategoriaActiva(state, action: PayloadAction<ICategorias[]>) {
      state.categoriaActiva = action.payload;
    },
    removeCategoriaActiva(state) {
      state.categoriaActiva = null;
    },
  },
});

export const { setCategoriaList, setCategoriaActiva, removeCategoriaActiva } =
  CategoriaSlice.actions;

export default CategoriaSlice.reducer;
