// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import empresaReducer from './empresaSlice'; // Importar el slice

export const store = configureStore({
  reducer: {
    empresas: empresaReducer, // Reducer para manejar las empresas
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
