import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

export function useShipping() {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const addShippingAddress = async (shippingData) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: shippingData,
    });
    Cookies.set("userAddress", JSON.stringify(shippingData));
  };

  const addPaymentMethod = async (paymentMethod) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    Cookies.set("paymentMethod", paymentMethod);
  };

  return { addShippingAddress, addPaymentMethod };
}
