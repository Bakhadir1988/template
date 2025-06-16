import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://dev.nmcms.ru/api/services/";

export interface Service {
  item_id: string;
  title: string;
  announce: {
    image: string;
  };
  text: string;
  url: string;
}

export interface ServiceState {
  items: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Ошибка сети ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch services";
      });
  },
});

export default serviceSlice.reducer;
