import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import viewsReducer from "./viewsSlice";

// Define types for items and bookmarks
interface Item {
  id: string;
  name: string;
}

interface Bookmark {
  id: string;
  url: string;
  title: string;
}

// Slice for items
const itemsSlice = createSlice({
  name: "items",
  initialState: [] as Item[],
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.push(action.payload); // Using immer under the hood
    },
    removeItem: (state, action: PayloadAction<number>) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

// Slice for bookmarks
const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: [] as Bookmark[],
  reducers: {
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.push(action.payload); // Using immer under the hood
    },
    removeBookmark: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((bookmark) => bookmark.id !== action.payload.id);
    },
  },
});

// Export actions
export const { addItem, removeItem } = itemsSlice.actions;
export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

// Create and export the store
const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    bookmarks: bookmarksSlice.reducer,
    views: viewsReducer,
  },
});

// Define RootState and AppDispatch types for use with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
