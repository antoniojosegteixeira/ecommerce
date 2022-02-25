import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import {
  loginRequest,
  registerRequest,
  userUpdateRequest,
} from "../../http/userOperations";

export function useAuth() {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const loginUser = async (userData) => {
    loginRequest(userData)
      .then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res.data });
        Cookies.set("userInfo", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data ? err.response.data : "Error", {
          variant: "error",
        });
      });
  };

  const logoutUser = () => {
    dispatch({ type: "USER_LOGOUT", payload: res });
    Cookies.remove("userInfo");
    router.push("/");
  };

  const registerUser = async (userData) => {
    registerRequest(userData)
      .then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res.data });
        Cookies.set("userInfo", JSON.stringify(res.data));
        enqueueSnackbar("Register successful", {
          variant: "success",
        });
        router.push("/");
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data ? err.response.data : "Error", {
          variant: "error",
        });
      });
  };

  const updateUser = async (userData) => {
    userUpdateRequest(userData, state.userInfo?.token)
      .then((res) => {
        dispatch({ type: "USER_UPDATE", payload: res.data });
        Cookies.set("userInfo", JSON.stringify(res.data));
        router.push("/");

        enqueueSnackbar("User updated successfully!", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.response?.data.message, { variant: "error" });
      });
  };

  console.log(state.userInfo);

  return { loginUser, logoutUser, registerUser, updateUser };
}
