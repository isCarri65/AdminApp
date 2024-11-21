import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImagen } from "../../../types/IImagen";

interface IinitialState {
  imageStringActivo: string | null,
  imageObjetoActivo: IImagen | null,
}
const initialState: IinitialState = {
  imageStringActivo: null,
  imageObjetoActivo: null,
}
const ImageReducer  = createSlice({
  name:"imageReducer",
  initialState,
  reducers:{
    setImageStringActivo(state, action: PayloadAction<string>){
      state.imageStringActivo = action.payload
    },
    removeImageStringActivo(state){
      state.imageStringActivo = null;
    },
    setImageObjetoActivo(state, action: PayloadAction<IImagen>){
      state.imageObjetoActivo = action.payload
    },
    removeImageObjetoActivo(state){
      state.imageObjetoActivo = null;
    }
  }
  

})

export const {setImageStringActivo, removeImageStringActivo, setImageObjetoActivo, removeImageObjetoActivo} = ImageReducer.actions

export default ImageReducer.reducer