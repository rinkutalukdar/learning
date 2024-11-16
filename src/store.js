import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice for items
const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload); // Using immer under the hood
    },
    removeItem: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

// Slice for bookmarks
const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: [],
  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload); // Using immer under the hood
    },
    removeBookmark: (state, action) => {
      return state.filter((bookmark) => bookmark.id !== action.payload.id);
    },
  },
});

// Export actions
export const { addItem, removeItem } = itemsSlice.actions;
export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    bookmarks: bookmarksSlice.reducer,
  },
});

export default store;
