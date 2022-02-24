import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { getProduct } from "../../http/cartOperations";
import { useSnackbar } from "notistack";

export function useCart() {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const addProduct = async (product) => {
    //Validate product
    const response = await getProduct(product._id);
    const existItem = state.cart.cartItems.find((e) => e._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // Check if there's stock
    if (product.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", {
        variant: "error",
      });
      return;
    } else {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...response.data, quantity },
      });
    }
  };

  const removeProduct = async (product) => {
    // Validate product
    const response = await getProduct(product._id);
    dispatch({ type: "CART_REMOVE_ITEM", payload: response.data });
  };

  const updateProduct = async (product, quantity) => {
    const response = await getProduct(product._id);
    const validProduct = response.data;
    if (validProduct.countInStock < quantity) {
      enqueueSnackbar("Sorry. Product is out of stock", {
        variant: "error",
      });
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...validProduct, quantity },
    });
  };

  return { addProduct, removeProduct, updateProduct };
}
