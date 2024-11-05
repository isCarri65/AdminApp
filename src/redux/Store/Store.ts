import { configureStore } from '@reduxjs/toolkit'
import SucursalReducer from '../slices/SucursalReducer/SucursalReducer'
import EmpresaReducer from '../slices/CompanyReducer/CompanyReducer'

// ...

export const store = configureStore({
  reducer: {
    sucursal: SucursalReducer,
    empresa: EmpresaReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch