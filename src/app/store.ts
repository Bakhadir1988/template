import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "@/entities/favorite/model/favoriteSlice";

export type RootState = {
  favorite: ReturnType<typeof favoriteReducer>;
};

const loadState = () => {
  try {
    // Очищаем старые данные
    localStorage.removeItem("state");
    return undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

export const store = configureStore<RootState>({
  reducer: {
    favorite: favoriteReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
