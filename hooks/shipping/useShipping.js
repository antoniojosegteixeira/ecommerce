import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useSnackbar } from "notistack";

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

  return { addShippingAddress };
}
