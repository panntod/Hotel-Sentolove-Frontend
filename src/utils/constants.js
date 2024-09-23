import { getLocalStorage } from "./helper/localStorage";

const BASE_API = "http://localhost:8000";
const BASE_API_IMAGE = "http://localhost:8000/public";

const LOCAL_STORAGE_TOKEN = "sentolove/token";
const LOCAL_STORAGE_USER = "sentolove/user";

const TOKEN = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

export {
  BASE_API,
  BASE_API_IMAGE,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  TOKEN,
};
