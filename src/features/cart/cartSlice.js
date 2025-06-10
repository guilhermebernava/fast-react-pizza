import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existItem = state.cart.filter(
        (item) => item.id === action.payload.id,
      )[0];

      if (existItem) return;

      const item = {
        ...action.payload,
        quantity: 1,
        totalPrice: 1 * action.payload.unitPrice,
      };

      state.cart = [...state.cart, item];
    },

    removeItem(state, action) {
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = newCart;
    },

    clearCart(state, action) {
      state.cart = [];
    },

    changeItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);

      if (!item) return;

      item.quantity += quantity;
      if (item.quantity <= 0) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else {
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
  },
});

export const { addItem, removeItem, changeItemQuantity, clearCart } =
  cartSlice.actions;

export function addItemThunk(pizza) {
  return (dispatch, getState) => {
    const { cart } = getState().cart;
    const existItem = cart.find((item) => item.id === pizza.id);
    if (existItem) {
      return false;
    }

    dispatch(addItem(pizza));
    return true;
  };
}

export default cartSlice.reducer;
