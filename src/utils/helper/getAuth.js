import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
import { getLocalStorage } from "./localStorage";

export const userAuth = () => {
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  const user = getLocalStorage(LOCAL_STORAGE_USER);

  if (token) {
    return {
      auth: true,
      token: token,
      role: user.role,
    };
  } else {
    return false;
  }
};
