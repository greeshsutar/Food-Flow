import { createSlice } from '@reduxjs/toolkit'



 const CartSlice = createSlice({
  name: 'cart',
  initialState:{
    items: []
  },
  reducers: {
   addItem: (state,action) => {
         state.items.push(action.payload);
      
    },
 removeItem: (state, action) => {
  state.items = state.items.filter(
    (item) => item.card.info.id !== action.payload
  );
},
   clearCart: (state ) => {
     state.items.length=0;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = CartSlice.actions

export default CartSlice.reducer