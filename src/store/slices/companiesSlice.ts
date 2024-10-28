import { createSlice } from '@reduxjs/toolkit';

const companiesSlice = createSlice({
  name: 'companies',
  initialState: [
    { id: 1, name: 'Empresa 1' },
    { id: 2, name: 'Empresa 2' },
    { id: 3, name: 'Empresa 3' }
  ],
  reducers: {}
});

export default companiesSlice.reducer;
