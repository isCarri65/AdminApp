// src/features/empresaSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const empresaSlice = createSlice({
  name: 'empresas',
  initialState: [
    { id: 1, name: 'Empresa 1' },
    { id: 2, name: 'Empresa 2' },
    { id: 3, name: 'Empresa 3' },
  ],
  reducers: {
    // Aquí puedes agregar acciones si necesitas cambiar el estado
  }
});

export default empresaSlice.reducer;
