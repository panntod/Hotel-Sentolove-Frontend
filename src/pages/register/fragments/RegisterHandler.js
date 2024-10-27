import axios from "axios";
import {
  BASE_API,
} from "../../../utils/constants";

export default async function RegisterHandler(values) {
  const REGISTER_URL = BASE_API + "/user/register";
  try {
    const registerData = await axios.post(REGISTER_URL, values);
    const res = registerData.data;

    if (res.status === "success") {
      return res;
    }
  } catch (err) {
    return Promise.resolve({
      status: "error",
      message: err.response?.data?.message,
    });
  }
}
