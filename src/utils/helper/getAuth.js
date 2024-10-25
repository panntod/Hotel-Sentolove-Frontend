import axios from "axios";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
import { getLocalStorage } from "./localStorage";

export const userAuth = () => {
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return {
      auth: true,
      role: user.role,
    };
  } else {
    return false;
  }
};
