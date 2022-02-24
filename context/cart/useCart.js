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

  return { addProduct };
}
