import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { favoriteApi, ListServerResponse } from "../api/favoriteApi";

export interface FavoriteState {
  items: ListServerResponse["items"];
  totalCost: number;
  totalQuantity: number;
  loadingItems: Record<string, boolean>;
  error: string | null;
}

const initialState: FavoriteState = {
  items: [],
  totalCost: 0,
  totalQuantity: 0,
  loadingItems: {},
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
  async () => {
    const response = await favoriteApi.get();
    return response;
  }
);

export const toggleFavorite = createAsyncThunk(
  "favorite/toggleFavorite",
  async (id: string, { getState }) => {
    const state = getState() as { favorite: FavoriteState };
    const isFavorite = state.favorite.items?.some(
      (item) => item.item_id === id
    );

    if (isFavorite) {
      await favoriteApi.remove(id);
    } else {
      await favoriteApi.add(id);
    }

    const updatedList = await favoriteApi.get();
    return updatedList;
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalCost = action.payload.total_cost || 0;
        state.totalQuantity = action.payload.total_quantity || 0;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch favorites";
      })
      .addCase(toggleFavorite.pending, (state, action) => {
        state.loadingItems[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totalCost = action.payload.total_cost || 0;
        state.totalQuantity = action.payload.total_quantity || 0;
        state.loadingItems[action.meta.arg] = false;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loadingItems[action.meta.arg] = false;
        state.error = action.error.message || "Failed to toggle favorite";
      });
  },
});

export default favoriteSlice.reducer;
