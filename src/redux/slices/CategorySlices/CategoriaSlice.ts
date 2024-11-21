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
    updateCategoriaInList(state, action) {
      const updatedCategoria = action.payload;
      const index = state.categoriaList.findIndex((cat) => cat.id === updatedCategoria.id);

      if (index !== -1) {
        // Actualiza una categoría padre directamente
        state.categoriaList[index] = updatedCategoria;
      } else {
        // Si no es una categoría padre, busca y actualiza en las subcategorías
        state.categoriaList.forEach((categoriaPadre) => {
          const subIndex = categoriaPadre.subCategorias?.findIndex(
            (subCat) => subCat.id === updatedCategoria.id
          );
          if (subIndex !== undefined && subIndex !== -1) {
            categoriaPadre.subCategorias[subIndex] = updatedCategoria;
          }
        });
      }
    },
  },
});

export const {
  setCategoriaList,
  setCategoriaActiva,
  removeCategoriaActiva,
  updateCategoriaInList,
} = CategoriaSlice.actions;

export default CategoriaSlice.reducer;
