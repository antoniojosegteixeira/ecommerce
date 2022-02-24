import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

// Login function
import loginRequest from "../../http/loginRequest";

export function useAuth() {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const loginUser = async (userData) => {
    loginRequest(userData)
      .then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("userInfo", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data ? err.response.data : "Error", {
          variant: "error",
        });
      });
  };

  return { loginUser };
}
