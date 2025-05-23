import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
  addtoCart(state, action) {
    if(state.find(cart => cart.id === action.payload.id)) {
        alert("Item already in cart")
    }
    else{
    state.push(action.payload)
    alert("Item added to cart")
    }
  },
  removeFromCart(state, action) {
    const id = action.payload
    return state.filter((cart) => cart.id !== id)
  },
  increaseQuantity(state, action) {
    const id = action.payload
    const item = state.find((cart) => cart.id === id)
    if (item) {
      item.quantity += 1
    }
  },
  decreaseQuantity(state, action) {
    const id = action.payload
    const item = state.find((cart) => cart.id === id)
    if (item) {
      if (item.quantity === 1) {
        alert("Quantity cannot be less than 1")
      }
      else{
      item.quantity -= 1
      }
    }
  },


}
})
export const { addtoCart, removeFromCart,increaseQuantity,decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer