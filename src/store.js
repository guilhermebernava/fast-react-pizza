import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";
import toastReducer from "./utils/toastSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    toast: toastReducer,
  },
});

export default store;
