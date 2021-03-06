import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
export const AppContext = createContext();

// Initial values
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    userAddress: Cookies.get("userAddress")
      ? JSON.parse(Cookies.get("userAddress"))
      : {},
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
  topProducts: [],
};

// Reducers
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
      const newState = {
        ...state,
        cart: { ...state.cart, cartItems: cartFilteredItems },
      };
      console.log(newState);
      return newState;

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], userAddress: {}, paymentMethod: "" },
      };

    case "SAVE_SHIPPING_ADDRESS":
      return { ...state, cart: { ...state.cart, userAddress: action.payload } };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case "CART_CLEAR":
      return {
        ...state,
        cart: { cartItems: [] },
      };

    case "ADD_TOP_PRODUCTS":
      return { ...state, topProducts: action.payload };

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
