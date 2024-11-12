import { configureStore } from "@reduxjs/toolkit";
import SucursalReducer from "../slices/SucursalReducer/SucursalReducer";
import EmpresaSlice from "../slices/CompanySlices/EmpresaSlice";
import ImageReducer from "../slices/ImageReducer/ImageReducer";
import CategorySlice from "../slices/CategorySlices/CategoriaSlice";
// ...

export const store = configureStore({
  reducer: {
    sucursal: SucursalReducer,
    empresa: EmpresaSlice,
    image: ImageReducer,
    categoria: CategorySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
