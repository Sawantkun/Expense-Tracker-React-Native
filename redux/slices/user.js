import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null,
    userLoading:false,
  }
  

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
     setUser:(state,action)=>{
        state.user = action.payload
     },
     setUserLoading:(state,action)=>{
        state.userLoading = action.payload
     }
  },
})

export const { setUser,setUserLoading} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state) => state.counter.value

export default counterSlice.reducer