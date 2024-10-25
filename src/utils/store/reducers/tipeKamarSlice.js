import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../../constants";

export const getAllTipeKamar = createAsyncThunk(
  "tipeKamar/getAllTipeKamar",
  async () => {
    const URL = `${BASE_API}/tipe_kamar/getAllData`;
    try {
      const data = await axios.get(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const searchTipeKamar = createAsyncThunk(
  "tipeKamar/searchTipeKamar",
  async (value) => {
    const URL = `${BASE_API}/tipe_kamar/search/${value}`;
    try {
      const data = await axios.get(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const checkAvailableKamarByDate = createAsyncThunk(
  "tipeKamar/checkAvailableKamarByDate",
  async ({ check_in, check_out }) => {
    const URL = `${BASE_API}/kamar/getTipeKamarAvailable/${check_in}/${check_out}`;
    try {
      const data = await axios.get(URL);
      const res = data.data;
      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const addTipeKamar = createAsyncThunk(
  "tipeKamar/addTipeKamar",
  async (values) => {
    const URL = `${BASE_API}/tipe_kamar/create`;
    try {
      const data = await axios.post(URL, values);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const updateTipeKamar = createAsyncThunk(
  "tipeKamar/updateTipeKamar",
  async ({ values, id }) => {
    const URL = `${BASE_API}/tipe_kamar/edit/${id}`;
    try {
      const data = await axios.patch(URL, values);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data,
        });
      }
    } catch (err) {
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

export const deleteTipeKamar = createAsyncThunk(
  "tipeKamar/deleteTipeKamar",
  async (id) => {
    const URL = `${BASE_API}/tipe_kamar/delete/${id}`;
    try {
      const data = await axios.delete(URL);
      const res = data.data;

      if (res.status === "success") {
        return Promise.resolve({
          status: "success",
          message: res.message,
          data: res.data.id_tipe_kamar,
        });
      }
    } catch (err) {
      alert(err.response.data.message);
      return Promise.resolve({
        status: "error",
        message: err.response.data.message,
      });
    }
  },
);

const tipeKamarAdapter = createEntityAdapter({
  selectId: (tipeKamar) => tipeKamar.id_tipe_kamar,
});

const tipeKamarSlice = createSlice({
  name: "tipeKamar",
  initialState: tipeKamarAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getAllTipeKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.setAll(state, action.payload.data);
      }
    });

    builder.addCase(searchTipeKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.setAll(state, action.payload.data);
      }
    });

    builder.addCase(checkAvailableKamarByDate.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.setAll(state, action.payload.data);
      }
    });

    builder.addCase(addTipeKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.addOne(state, action.payload.data);
      }
    });

    builder.addCase(updateTipeKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.updateOne(state, {
          id: action.payload.data.id_tipe_kamar,
          changes: action.payload.data,
        });
      }
    });

    builder.addCase(deleteTipeKamar.fulfilled, (state, action) => {
      if (action.payload.status === "success") {
        tipeKamarAdapter.removeOne(state, action.payload.data);
      }
    });
  },
});

export const tipeKamarSelectors = tipeKamarAdapter.getSelectors(
  (state) => state.tipeKamar,
);

export default tipeKamarSlice.reducer;
