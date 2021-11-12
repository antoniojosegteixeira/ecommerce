import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
export const AppContext = createContext();

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };

    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };

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
