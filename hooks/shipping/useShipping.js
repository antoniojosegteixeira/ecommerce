import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { placeOrderRequest } from "../../http/OrderOperations";
import { useRouter } from "next/router";

export function useShipping() {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const addShippingAddress = (shippingData) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: shippingData,
    });
    Cookies.set("userAddress", JSON.stringify(shippingData));
  };

  const addPaymentMethod = (paymentMethod) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    Cookies.set("paymentMethod", paymentMethod);
  };

  const placeOrder = async (order) => {
    if (!state.userInfo.token) {
      enqueueSnackbar("Please login", { variant: "error" });
    }
    try {
      const { data } = await placeOrderRequest(order, state.userInfo.token);
      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      router.push(`/order/${data._id}`);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.response?.data?.message, { variant: "error" });
    }
  };

  return { addShippingAddress, addPaymentMethod, placeOrder };
}
