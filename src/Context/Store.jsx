import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./CartSlicer";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
