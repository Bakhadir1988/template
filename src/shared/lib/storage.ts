export type StorageKey = "favorites" | "cart" | "compare";

interface StorageData {
  favorites: string[];
  cart: string[];
  compare: string[];
}

const STORAGE_KEY = "app_storage";

export const storage = {
  get: (): StorageData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { favorites: [], cart: [], compare: [] };
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return { favorites: [], cart: [], compare: [] };
    }
  },

  set: (data: Partial<StorageData>) => {
    try {
      const currentData = storage.get();
      const newData = { ...currentData, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return storage.get();
    }
  },

  getItem: (key: StorageKey): string[] => {
    const data = storage.get();
    return data[key] || [];
  },

  setItem: (key: StorageKey, value: string[]) => {
    return storage.set({ [key]: value });
  },

  addItem: (key: StorageKey, id: string) => {
    const items = storage.getItem(key);
    if (!items.includes(id)) {
      return storage.setItem(key, [...items, id]);
    }
    return items;
  },

  removeItem: (key: StorageKey, id: string) => {
    const items = storage.getItem(key);
    return storage.setItem(
      key,
      items.filter((item) => item !== id)
    );
  },

  clear: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
