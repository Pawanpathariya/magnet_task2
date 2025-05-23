import {configureStore} from "@reduxjs/toolkit"
import CartSlice from './cartSlice'
export const store=configureStore(
    {
        reducer:{
      cart:CartSlice
        }
    }
)