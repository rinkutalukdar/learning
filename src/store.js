import { configureStore } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  items: [] // Ensure items is initialized as an empty array
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload)
      };
    default:
      return state;
  }
};

// Create store using configureStore
const store = configureStore({
  reducer
});

export default store;
