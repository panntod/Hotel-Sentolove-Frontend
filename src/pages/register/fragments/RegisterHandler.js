import axios from "axios";
import {
  BASE_API,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
} from "../../../utils/constants";
import { setLocalStorage } from "../../../utils/helper/localStorage";

export default async function LoginHandler(values) {
  const REGISTER_URL = BASE_API + "/user/register";
  try {
    const registerData = await axios.post(REGISTER_URL, values);
    const res = registerData.data;

    if (res.status === "success") {
      setLocalStorage(LOCAL_STORAGE_TOKEN, res.token);
      setLocalStorage(LOCAL_STORAGE_USER, res.data);

      return res;
    }

    return Promise.resolve({
      status: res.status,
      message: res.message,
    });
  } catch (err) {
    return Promise.resolve({
      status: "error",
      message: err.response?.data?.message,
    });
  }
}
