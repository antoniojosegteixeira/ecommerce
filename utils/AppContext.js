import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
export const AppContext = createContext();

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };

    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // Setting cookies
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM":
      const cartFilteredItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartFilteredItems));
      return { ...state, cart: { ...state.cart, cartFilteredItems } };

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default StoreProvider;
